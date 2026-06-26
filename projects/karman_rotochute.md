---
title: Spacecraft Recovery via Rotary Wings — Autorotation Study
image: images/projects/karman_rotochute.png
tags: STAR-CCM+, MATLAB, Python
report: reports/pararotor recovery system design - joao gaspar - 96930 - peaer.pdf
---

## Overview

MSc thesis project: a computational investigation into the use of autorotating rotary wings — specifically the Kármán rotochute concept — as a passive deceleration mechanism for spacecraft atmospheric re-entry and recovery. The work addressed the aerodynamic feasibility of sustained autorotation at subsonic descent velocities typical of final-stage recovery.

## Motivation

Conventional parachute systems introduce deployment complexity and volume penalties. Rotary-wing autorotation offers a structurally simple, inherently stable alternative that can deliver controlled descent rates without an energy source.

## Methodology

- Full 3-D unsteady RANS simulations conducted in **STAR-CCM+** with sliding mesh interfaces to capture rotor–wake interactions.
- Parametric study on blade pitch angle, rotor solidity, and aspect ratio to map the autorotation onset boundary.
- Momentum and blade element theory employed to cross-validate CFD thrust and torque predictions.
- Time-averaged flow fields analysed to characterise tip-vortex structure and downwash distribution.

## Key Results

- Identified the pitch angle range (8°–14°) that sustains steady autorotation for the given rotor geometry.
- Descent rate predictions agreed with analytical estimates within 7 %.
- Tip-vortex rollup visualisations confirmed stable helical wake structure during steady autorotation.

## Tools

`STAR-CCM+` · `MATLAB` · `Python`
