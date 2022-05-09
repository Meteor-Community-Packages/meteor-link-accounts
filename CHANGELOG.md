# Changelog

## v. 2.6.0 - XX.5.2022
* Added `freedombase:web3-login`

## v. 2.5.0 - 9.5.2022
* Make hooks stoppable
* Fix commit script
* Added Apple provider for `quave:accounts-apple` or `bigowl:accounts-apple` package

## v. 2.4.1 - 10.11.2021
* Upgrade eslint-parser
* Fix wrong uppercase in the word `linkedIn` for `pauli:linkedin-oauth`

## v. 2.4.0 - 24.6.2021

* Updated dependencies
* Compatibility update for Meteor 2.3

## v. 2.3.2 - 8.2.2021
* Fix bugs in MS Office connector

## v. 2.3.1 - 8.2.2021
* Fix a detection bug in MS Office connector

## v. 2.3.0 - 29.1.2021
* Added extra check on linking accounts and made connection errors provide a bit more information
* Updated development dependencies
* Add support for MS Office 365 logins via `lindoelio:accounts-office365` and `ermlab:accounts-office365`

## v. 2.2.1 - 6.9.2020
* Fix Meteor Developer Accounts link

## v. 2.2.0 - 2.9.2020
* Updated example to Meteor 1.10.2
* Bumped minimum required version of Meteor to 1.4.3
* Add missing imports
* Fix code to adhere to StandardJS
* Add hooks (`Accounts.onLink`, `Accounts.beforeLink`, `Accounts.onUnlink`)

## v. 2.1.1 - 28.4.2020
* Fix error in Discord connector
* Format changelog
* Added GitHub settings & legal stuff

## v. 2.1.0 - 18.09.2019
* `jonperl:linkedin` has been deprecated in favor of `pauli:linkedin-oauth` in order to keep up with changes in LinkedIn API. You will see a depracetion warning in your app for this. The old package will work, but will be removed in future releases.

## v. 2.0.2
* Fix unlinked accounts method
* Fix missing imports
* Fix minimum required Meteor version to v 1.3

## v. 2.0.0
* Modernize package to use with `ecmascript` package
* Drop `underscore`
* LINE support

## v. 1.2.0
* unlink accounts
* linkedin support
