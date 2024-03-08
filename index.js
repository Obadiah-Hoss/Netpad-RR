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

function updateGamepadState() {
    const gamepads = navigator.getGamepads ? navigator.getGamepads() : [];
    for (let i = 0; i < gamepads.length; i++) {
        const gamepad = gamepads[i];
        if (gamepad) {
            console.log(`Gamepad at index ${gamepad.index} is connected.`);
            // Access gamepad.axes and gamepad.buttons here
            for (let j = 0; j < gamepad.buttons.length; j++) {
                const button = gamepad.buttons[j];
                if (button.pressed) {
                    console.log(`Button ${j} is pressed.`);
                }
            }
            for (let k = 0; k < gamepad.axes.length; k++) {
                const axis = gamepad.axes[k];
                console.log(`Axis ${k} is at position ${axis}.`);
            }
        }
    }
    window.requestAnimationFrame(updateGamepadState);
}

window.requestAnimationFrame(updateGamepadState);
