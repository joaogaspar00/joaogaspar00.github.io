---
title: Telemetry Acquisition & Graphing System
image: images/projects/tag.png
tags: C, PCB Design, LabVIEW, MATLAB
report: reports/AmbEsp.pdf
---

## Overview

Design and implementation of a real-time telemetry acquisition and graphing (TAG) system for monitoring critical parameters of a hydrogen-powered competition vehicle during track runs. The system logged fuel cell voltage, current, temperature, and wheel speed at high sample rates and transmitted data wirelessly to a pit-side dashboard.

## Methodology

- Sensor signals conditioned with custom **PCB** front-ends (anti-aliasing filters, instrumentation amplifiers) before digitisation.
- Microcontroller firmware written in **C** to handle multi-channel ADC sampling, CAN bus communication, and RF packet transmission.
- Pit-side software developed in **LabVIEW** for real-time strip-chart display and CSV data logging.
- System validated on a bench rig simulating fuel cell load profiles before track deployment.

## Key Results

- Achieved 100 Hz synchronised sampling across 12 channels with sub-millisecond timestamp accuracy.
- Wireless link maintained at up to 150 m range with no packet loss during indoor circuit tests.
- Data collected informed fuel cell operating point adjustments that improved energy efficiency by approximately 8 % between runs.

## Tools

`C` · `LabVIEW` · `PCB Design` · `MATLAB`
