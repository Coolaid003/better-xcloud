import { MkbHandler } from "@modules/mkb/mkb-handler";
import { PrefKey, getPref } from "@utils/preferences";
import { t } from "@utils/translation";
import { Toast } from "@utils/toast";
import { BxLogger } from "@utils/bx-logger";

// Show a toast when connecting/disconecting controller
export function showGamepadToast(gamepad: Gamepad) {
    // Don't show Toast for virtual controller
    if (gamepad.id === MkbHandler.VIRTUAL_GAMEPAD_ID) {
        return;
    }

    BxLogger.info('Gamepad', gamepad);
    let text = '🎮';

    if (getPref(PrefKey.LOCAL_CO_OP_ENABLED)) {
        text += ` #${gamepad.index + 1}`;
    }

    // Remove "(STANDARD GAMEPAD Vendor: xxx Product: xxx)" from ID
    const gamepadId = gamepad.id.replace(/ \(.*?Vendor: \w+ Product: \w+\)$/, '');
    text += ` - ${gamepadId}`;

    let status;
    if (gamepad.connected) {
        const supportVibration = !!gamepad.vibrationActuator;
        status = (supportVibration ? '✅' : '❌') + ' ' + t('vibration-status');
    } else {
        status = t('disconnected');
    }

    Toast.show(text, status, {instant: false});
}
