# Seesaw Simulation

A simple seesaw simulation built with pure JavaScript, HTML and CSS.

## Features

- Click on the seesaw to drop objects with random weights (1–10 kg)
- The seesaw tilts based on torque (weight × distance from center)
- Objects stay attached to the seesaw and rotate with it
- Total weight on each side is displayed
- State is stored in localStorage so the setup survives page refresh
- Reset button to clear all objects

## How it works

- On each click, a new object is created with:
  - randomWeight (1–10)
  - side (left/right)
  - distance from the center
- Torque is calculated for each side, and the angle is derived from the torque difference.
- The angle is clamped between -30° and 30°.
- The seesaw line is rotated with CSS `transform`, and objects are rendered as children of the line.

## AI Assistance

I used AI only for:
- Debugging localStorage usage
- Getting ideas for UI improvements and wording

All core logic and structure were implemented and understood by me.