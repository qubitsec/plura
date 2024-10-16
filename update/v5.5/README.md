PLURA Release Notes

# PLURA 5.5 Change Log

## Major Changes

### 1. Update 2024

PLURA 5.5 introduces significant updates, including new features, security enhancements, and performance improvements. It’s important to carefully review these changes before upgrading your PLURA platform.

### 2. Update 2023

- **JDK Requirement**: PLURA 5.5 now requires JDK 17 or higher.
- **Removed Deprecated APIs**: Several deprecated APIs from previous versions have been removed. Ensure your integrations and configurations are updated.
- **Changes to Log Processing**: Enhancements in the log processing pipeline might require adjusting your configuration for optimal performance.

## Detailed Changes

### 3. Bug Fixes

- **PLURA-10081**: Fixed an issue where certain log formats were incorrectly parsed, causing data loss in rare scenarios.
- **PLURA-10542**: Resolved a memory leak that occurred during high-load conditions when handling multiple large log files simultaneously.

### 4. Enhancements

- **PLURA-10329**: Enhanced detection algorithms to improve accuracy in identifying advanced persistent threats (APTs), reducing false positives by 20%.
- **PLURA-10621**: Added support for integration with external threat intelligence feeds, allowing for real-time updates and automatic rule adjustments.

## Deprecated Features

- **Legacy Report Generator**: The old report generator has been deprecated and replaced with a new, faster, and more flexible reporting module.
- **Joda-Time**: PLURA 5.5 deprecates the use of Joda-Time in favor of Java’s `java.time` package for handling timestamps.

## How to Upgrade

To upgrade from PLURA 5.x to 5.5, follow these steps:

1. Backup your PLURA configuration and log data.
2. Download PLURA 5.5 from the [official PLURA website](https://plura.io/).
3. Install JDK 17 or higher if not already installed.
4. Review your configuration and ensure any deprecated APIs are no longer used.
5. Restart PLURA services after the upgrade is complete.

For more information, refer to the [official upgrade guide](https://plura.io/docs/5_5/upgrade-guide.html).

---

_Last updated: October 16 2024_
