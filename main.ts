radio.onReceivedNumber(function (receivedNumber) {
    if (hide_mode == 0) {
        if (recent_max_device == radio.receivedPacket(RadioPacketProperty.SerialNumber)) {
            recent_max = radio.receivedPacket(RadioPacketProperty.SignalStrength)
        } else if (radio.receivedPacket(RadioPacketProperty.SignalStrength) > recent_max) {
            recent_max_device = radio.receivedPacket(RadioPacketProperty.SerialNumber)
            recent_max = radio.receivedPacket(RadioPacketProperty.SignalStrength)
        }
        led.plotBarGraph(
        Math.map(recent_max, -100, -42, 0, 9),
        9
        )
    }
})
input.onButtonPressed(Button.AB, function () {
    if (hide_mode == 0) {
        hide_mode = 1
        radio.setTransmitPower(7)
        basic.showString("hide")
    } else {
        hide_mode = 0
        recent_max = -120
        recent_max_device = 0
        basic.showString("seek")
    }
})
let hide_mode = 0
let recent_max_device = 0
let recent_max = 0
recent_max = -120
recent_max_device = 0
radio.setGroup(1)
hide_mode = 1
radio.setTransmitPower(7)
basic.showString("hide")
basic.forever(function () {
    if (hide_mode == 1) {
        radio.sendNumber(0)
        basic.pause(500)
    }
})
