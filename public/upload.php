<?php
// public/upload.php
// Upload de imagens dos treinamentos da UniCagen.
//
// Fluxo:
// 1. Recebe a imagem + título do treinamento.
// 2. Valida a sessão do Supabase.
// 3. Verifica se o usuário é admin.
// 4. Valida tamanho e tipo real da imagem.
// 5. Gera um nome legível e único.
// 6. Salva em /uploads/treinamentos.
// 7. Retorna o caminho relativo da imagem.

header("Content-Type: application/json; charset=utf-8");

// CONFIGURAÇÃO

$supabaseUrl = "https://fctjbvjkmfmyziajevlr.supabase.co";

// Pode manter sua anon key aqui.
// Ela não é uma chave secreta, mas o RLS continua sendo essencial.
$supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZjdGpidmprbWZteXppYWpldmxyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIzNDYyNDgsImV4cCI6MjA5NzkyMjI0OH0.UdY3k32o91liS_JsSCFvZygbull0MJLOTMHK-XQJRlY";

$pastaUploads = __DIR__ . "/uploads/treinamentos";

$tiposPermitidos = [
    "image/jpeg",
    "image/png",
    "image/webp"
];

$tamanhoMaximo = 5 * 1024 * 1024; // 5 MB

// FUNÇÕES AUXILIARES

function responderErro($status, $mensagem)
{
    http_response_code($status);

    echo json_encode([
        "error" => $mensagem
    ]);

    exit;
}


function slugify($texto)
{
    $texto = trim($texto);

    if ($texto === "") {
        return "treinamento";
    }

    $convertido = iconv(
        "UTF-8",
        "ASCII//TRANSLIT//IGNORE",
        $texto
    );

    if ($convertido !== false) {
        $texto = $convertido;
    }

    $texto = strtolower($texto);

    // Qualquer coisa diferente de letra/número vira "_"
    $texto = preg_replace(
        "/[^a-z0-9]+/",
        "_",
        $texto
    );

    $texto = trim($texto, "_");

    return $texto !== ""
        ? $texto
        : "treinamento";
}

// SOMENTE POST

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    responderErro(
        405,
        "Método não permitido."
    );
}

// TOKEN SUPABASE

function obterAuthorizationHeader()
{
    // 1. Tenta pelas variáveis do servidor
    if (!empty($_SERVER["HTTP_AUTHORIZATION"])) {
        return trim($_SERVER["HTTP_AUTHORIZATION"]);
    }

    if (!empty($_SERVER["REDIRECT_HTTP_AUTHORIZATION"])) {
        return trim($_SERVER["REDIRECT_HTTP_AUTHORIZATION"]);
    }

    // 2. Fallback para getallheaders()
    if (function_exists("getallheaders")) {
        $headers = getallheaders();

        foreach ($headers as $nome => $valor) {
            if (strcasecmp($nome, "Authorization") === 0) {
                return trim($valor);
            }
        }
    }

    return null;
}

$authHeader = obterAuthorizationHeader();

if (
    !$authHeader ||
    !preg_match("/^Bearer\s+(.+)$/i", $authHeader, $matches)
) {
    http_response_code(401);

    echo json_encode([
        "error" => "Token de autenticação ausente."
    ]);

    exit;
}

$accessToken = $matches[1];

// VALIDA A SESSÃO NO SUPABASE

$ch = curl_init(
    "$supabaseUrl/auth/v1/user"
);

curl_setopt(
    $ch,
    CURLOPT_RETURNTRANSFER,
    true
);

curl_setopt(
    $ch,
    CURLOPT_HTTPHEADER,
    [
        "Authorization: Bearer $accessToken",
        "apikey: $supabaseAnonKey"
    ]
);

$respostaAuth = curl_exec($ch);

$statusAuth = curl_getinfo(
    $ch,
    CURLINFO_HTTP_CODE
);

if ($respostaAuth === false) {

    curl_close($ch);

    responderErro(
        500,
        "Não foi possível validar a sessão."
    );
}

curl_close($ch);

if ($statusAuth !== 200) {
    responderErro(
        401,
        "Sessão inválida ou expirada."
    );
}

// PEGA O ID DO USUÁRIO AUTENTICADO

$usuarioAuth = json_decode(
    $respostaAuth,
    true
);

$idUsuario = $usuarioAuth["id"] ?? null;

if (!$idUsuario) {
    responderErro(
        401,
        "Não foi possível identificar o usuário."
    );
}

// VERIFICA SE O USUÁRIO É ADMIN

//
// Consulta public.usuarios usando o MESMO JWT.
// Portanto, as policies RLS da tabela usuarios continuam
// sendo respeitadas.
//

$urlUsuario =
    "$supabaseUrl/rest/v1/usuarios"
    . "?id=eq."
    . rawurlencode($idUsuario)
    . "&select=regra";

$ch = curl_init($urlUsuario);

curl_setopt(
    $ch,
    CURLOPT_RETURNTRANSFER,
    true
);

curl_setopt(
    $ch,
    CURLOPT_HTTPHEADER,
    [
        "Authorization: Bearer $accessToken",
        "apikey: $supabaseAnonKey",
        "Accept: application/json"
    ]
);

$respostaUsuario = curl_exec($ch);

$statusUsuario = curl_getinfo(
    $ch,
    CURLINFO_HTTP_CODE
);

if ($respostaUsuario === false) {

    curl_close($ch);

    responderErro(
        500,
        "Não foi possível verificar as permissões do usuário."
    );
}

curl_close($ch);

if ($statusUsuario !== 200) {
    responderErro(
        403,
        "Não foi possível verificar a permissão de administrador."
    );
}

$usuarios = json_decode(
    $respostaUsuario,
    true
);

$regra = $usuarios[0]["regra"] ?? null;

if ($regra !== "admin") {
    responderErro(
        403,
        "Apenas administradores podem enviar imagens."
    );
}

// VERIFICA SE RECEBEU UMA IMAGEM

if (
    !isset($_FILES["imagem"]) ||
    $_FILES["imagem"]["error"] !== UPLOAD_ERR_OK
) {
    responderErro(
        400,
        "Nenhuma imagem válida foi enviada."
    );
}

$arquivo = $_FILES["imagem"];

// VALIDA TAMANHO

if ($arquivo["size"] > $tamanhoMaximo) {
    responderErro(
        400,
        "Imagem excede o tamanho máximo de 5MB."
    );
}

// VALIDA O TIPO REAL

$finfo = finfo_open(
    FILEINFO_MIME_TYPE
);

$tipoReal = finfo_file(
    $finfo,
    $arquivo["tmp_name"]
);

finfo_close($finfo);

if (
    !in_array(
        $tipoReal,
        $tiposPermitidos,
        true
    )
) {
    responderErro(
        400,
        "Tipo de arquivo não permitido. Use JPEG, PNG ou WebP."
    );
}

// TÍTULO DO TREINAMENTO

$titulo = trim(
    $_POST["titulo"] ?? ""
);

// Caso por algum motivo o frontend não mande o título,
// utiliza o nome original do arquivo como fallback.

if ($titulo === "") {

    $titulo = pathinfo(
        $arquivo["name"],
        PATHINFO_FILENAME
    );
}

$nomeBase = slugify($titulo);

// EXTENSÃO BASEADA NO MIME REAL

$extensoes = [
    "image/jpeg" => "jpg",
    "image/png"  => "png",
    "image/webp" => "webp"
];

$extensao = $extensoes[$tipoReal];

// GERA NOME ÚNICO

$sufixo = bin2hex(
    random_bytes(4)
);

$nomeArquivo =
    "{$nomeBase}_{$sufixo}.{$extensao}";


// GARANTE QUE A PASTA EXISTE

if (!is_dir($pastaUploads)) {

    if (
        !mkdir(
            $pastaUploads,
            0755,
            true
        )
    ) {
        responderErro(
            500,
            "Não foi possível criar a pasta de uploads."
        );
    }
}

// SALVA A IMAGEM

$caminhoDestino =
    "$pastaUploads/$nomeArquivo";

if (
    !move_uploaded_file(
        $arquivo["tmp_name"],
        $caminhoDestino
    )
) {
    responderErro(
        500,
        "Falha ao salvar a imagem no servidor."
    );
}

// RETORNA O CAMINHO PARA O FRONTEND

$caminhoPublico =
    "/uploads/treinamentos/$nomeArquivo";

http_response_code(200);

echo json_encode([
    "url" => $caminhoPublico
]);