#!/usr/bin/env bash
# Cross-platform notification for Claude Code hooks
# Usage: notify.sh <subtitle> <message> [macos_sound] [win_icon]
SUBTITLE="${1}" MESSAGE="${2}" SOUND="${3:-Glass}" ICON="${4:-Information}"

if [[ "$(uname)" == "Darwin" ]]; then
  osascript -e "display notification \"${MESSAGE}\" with title \"Claude Code\" subtitle \"${SUBTITLE}\" sound name \"${SOUND}\""
else
  powershell.exe -NoProfile -Command "[void][System.Reflection.Assembly]::LoadWithPartialName('System.Windows.Forms'); \$n=New-Object System.Windows.Forms.NotifyIcon; \$n.Icon=[System.Drawing.SystemIcons]::${ICON}; \$n.BalloonTipTitle='Claude Code - ${SUBTITLE}'; \$n.BalloonTipText='${MESSAGE}'; \$n.Visible=\$true; \$n.ShowBalloonTip(3000); \$n.Dispose()"
fi
