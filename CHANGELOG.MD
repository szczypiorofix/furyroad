# FURY ROAD - Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.1.05] - 2019-09-17
### Added
- Deploy automation: installing modules and restarting production server.
- Added Changelog as a news-like system that can be accessed from main menu of the game

### Changed
- Fixed login to game


## [0.1.04] - 2019-09-04
### Added
- Added MongoDB database support.
- Splash screen with login/logout/play offline menu.

### Changed
- User data (savegame) are stored in database instead of browser's localStorage.

## [0.1.03] - 2019-08-01
### Added
- Music settings: on/off in Settings menu.
- Reset stats & events button in Settings menu.
- game settings is now put in redux store object.

### Changed
- 'canContinue' setting is now set in redux store instead of local variable in the Settings component.


## [0.1.02] - 2019-07-31
### Added
- Added NodeJS + Express as a backend of the application.
- Music is now streamed to the user.

### Changed
- Changed location of music file.
- Changed description in Skywalker Ranch event.

## [0.1.01] - 2019-07-26
### Added
- Choices made in game has some effects.
- Added support of SCSS

### Changed
- Changed color palette.

### Removed
- Removed LESS support.


## [0.1.0] - 2019-07-23
### Added
- The beginning of tracking changes on the project.
- Added CHANGELOG.MD file for changelog.

### Changed
- changed application version in README.MD file from 0.05 to 0.1.0.
