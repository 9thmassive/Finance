import { Card, Button, Alert } from 'react-bootstrap'
import { useState } from 'react'

export default function User() {
    const [error, setError] = useState('')

    function logout() {}
    return (
        <>
            {/* <Card className="w-100" style={{ maxWidth: '400px' }}>
                <Card.Body>
                    <h2 className="text-center mb-4">Profil</h2>
                </Card.Body>
            </Card> */}
            <div className="w-100 text-center mt-2">
                <Button variant="link" onClick={logout}>
                    Log out
                </Button>
            </div>
        </>
    )
}
