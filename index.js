
if (!('getGamepads' in navigator)) {
    alert('Gamepad API not supported in this browser.');
}

window.addEventListener("gamepadconnected", (event) => {
    console.log(`Gamepad connected at index ${event.gamepad.index}: ${event.gamepad.id}.`);
    const statusElement = document.getElementById("conn-status");
    if (statusElement) {
        statusElement.textContent = `Gamepad connected at index ${event.gamepad.index}: ${event.gamepad.id}.`;
    }
});

window.addEventListener("gamepaddisconnected", (event) => {
    console.log(`Gamepad disconnected from index ${event.gamepad.index}: ${event.gamepad.id}.`);
    const statusElement = document.getElementById("conn-status");
    if (statusElement) {
        statusElement.textContent = 'No gamepad connected';
    }
});



window.requestAnimationFrame(updateGamepadState);



async function updateGamepadState() {
    const gamepads = navigator.getGamepads ? navigator.getGamepads() : [];
    for (let i = 0; i < gamepads.length; i++) {
        const gamepad = gamepads[i];
        if (gamepad) {
            // Prepare the data you want to send
            const dataToSend = {
                gamepadIndex: gamepad.index,
                buttons: Array.from(gamepad.buttons, button => button.pressed),
                axes: Array.from(gamepad.axes)
            };

            // Use fetch to send a POST request to your Flask server
            try {
                const response = await fetch('/gamepad', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(dataToSend),
                });
                const jsonResponse = await response.json();
                console.log(jsonResponse); // Handle the response from the server
            } catch (error) {
                console.error('Error sending gamepad data:', error);
            }
        }
    }
    window.requestAnimationFrame(updateGamepadState);
}

window.requestAnimationFrame(updateGamepadState);







