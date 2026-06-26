---
title: Analog Signal Conditioning Filter System
image: images/projects/filter%20system.png
tags: PCB Design, KiCad, SPICE, LabVIEW
report: reports/Trash_Can_with_Odor_Neutralization.pdf
---

## Overview

Design, simulation, and hardware implementation of an analog signal conditioning chain for a multi-axis accelerometer array used in structural vibration measurements. The filter system removed aliasing components and suppressed power-line interference ahead of digitisation by a data acquisition module.

## Methodology

- Requirements derived from accelerometer bandwidth (0–2 kHz) and ADC sample rate (10 kSa/s); Nyquist anti-aliasing cutoff set at 4 kHz.
- Active low-pass filters implemented as 4th-order Butterworth stages using **operational amplifiers** in Sallen–Key topology.
- 50 Hz notch filter added using a twin-T RC network to attenuate power-line noise.
- Schematic capture and layout completed in **KiCad**; prototype assembled and characterised on a PCB.
- Frequency response measured with a network analyser and compared against SPICE simulations.

## Key Results

- Measured –3 dB point at 3.98 kHz, within 0.5 % of the design target.
- Notch depth exceeded 45 dB at 50 Hz, reducing interference to below the ADC noise floor.
- Out-of-band attenuation of –80 dB at 10 kHz confirmed adequate aliasing suppression.

## Tools

`KiCad` · `SPICE` · `LabVIEW` · `MATLAB`
