import { useState } from 'react'
import { useAuth } from '../../hooks/auth/useAuth';

export default function Profile() {
    const { user } = useAuth();

    return (
        <div>
            <h1>Profile Page</h1>
        </div>
    )
}