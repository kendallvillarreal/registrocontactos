document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const telefono = document.getElementById('telefono').value;

    fetch('http://localhost:5000/user/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, telefono })
    })
    .then(response => response.json())
    .then(data => {
        if (data.user_id) {
            alert(`Usuario registrado: ${data.name} (${data.email}) ${data.telefono}`);
            document.getElementById('name').value = '';
            document.getElementById('email').value = '';
            document.getElementById('telefono').value = '';
        } else {
            alert('Error al registrar usuario');
        }
    })
    .catch(error => console.error('Error:', error));
});

function getUser() {
    const userId = document.getElementById('userId').value;
    if (userId) {
        fetch(`http://localhost:5000/user/${userId}`)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                alert('Usuario no encontrado');
            } else {
                alert(`Detalles del usuario:\nID: ${data.user_id}\nNombre: ${data.name}\nEmail: ${data.email}\ntelefono: ${data.telefono}`);
            }
        })
        .catch(error => console.error('Error:', error));
    } else {
        alert('Por favor, ingrese un ID de usuario válido.');
    }
}

function updateUser() {
    const userId = document.getElementById('userId').value;
    if (userId) {
        const name = prompt('Ingrese el nuevo nombre:');
        const email = prompt('Ingrese el nuevo email:');
        const telefono = prompt('Ingrese el nuevo telefono:');

        if (name && email) {
            fetch(`http://localhost:5000/user/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, telefono })
            })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    alert('Usuario no encontrado');
                } else {
                    alert(`Usuario actualizado:\nNombre: ${data.name}\nEmail: ${data.email}\nTelefono: ${data.telefono}`);
                }
            })
            .catch(error => console.error('Error:', error));
        } else {
            alert('Debe ingresar nombre, email y telefono válidos.');
        }
    } else {
        alert('Por favor, ingrese un ID de usuario válido.');
    }
}

function deleteUser() {
    const userId = document.getElementById('userId').value;
    if (userId) {
        fetch(`http://localhost:5000/user/${userId}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (response.ok) {
                alert('Usuario eliminado correctamente');
            } else {
                alert('Error al eliminar usuario');
            }
        })
        .catch(error => console.error('Error:', error));
    } else {
        alert('Por favor, ingrese un ID de usuario válido.');
    }
}
