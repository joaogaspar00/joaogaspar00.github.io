---
title: Flight Test Data Acquisition Interface
image: images/projects/interface.png
tags: LabVIEW, Python, MATLAB
report: reports/HW3_AERO3.pdf
---

## Overview

Development of a graphical data acquisition and monitoring interface for a low-speed wind-tunnel test campaign. The interface provided real-time visualisation of force-balance readings, pressure scanner data, and flow condition metrics, with integrated logging and export functionality.

## Methodology

- Instrument communication implemented over USB and GPIB using **LabVIEW** VISA drivers.
- Front panel designed with strip charts, polar plot overlays, and a live tunnel state indicator (velocity, temperature, pressure) to give operators situational awareness.
- Data stored in structured HDF5 files with run metadata embedded in file attributes for traceability.
- Post-processing scripts written in **Python** (NumPy / Matplotlib) to reduce raw voltages to aerodynamic coefficients and generate publication-quality plots.

## Key Results

- Reduced manual data-reduction time from several hours per run to under 10 minutes by automating coefficient conversion and outlier flagging.
- Interface adopted as the standard acquisition tool for subsequent wind-tunnel campaigns in the lab.
- HDF5 archive structure enabled straightforward data sharing and reproducibility of published results.

## Tools

`LabVIEW` · `Python` · `MATLAB`
