# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

[2.0.0] - 2023-06-21

### Changed

- Upgrade repo to node 18

[1.3.0] - 2023-05-30

### Changed

- Add two additional ingestion sources: user & domains

[1.2.0] - 2023-04-17

### Added

- Add new ingestion source to group awareness campaigns steps

[1.1.2] - 2022-09-28

### Changed

- update sdk

[1.1.1] - 2022-03-07

### Fixed

- upgraded vulnerable url-parse package, fixed breakage in recordings
- use latest sdk testing features
- add in-depth tests for validating invocation
- correctly parse got non-200 response during api error construction
- upgrade vulnerable follow-redirects package

[1.1.0] - 2022-01-26

### Added

- pagination support for user and awareness training participant ingestion
- more docs
- missing test
- ingest awareness training campaigns and participants, add relationships

[1.0.1] - 2022-01-18

### Changed

- version to fix tagging issue

[1.0.0] - 2022-01-17

### Added

- initial mimecast integration
- ingests account info, domains, users, and establishes relationships
