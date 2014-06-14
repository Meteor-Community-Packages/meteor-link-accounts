#Meteor Link Accounts
A Meteor package designed to link social network accounts without any hassles.

##Goals
* We want to link additional social network accounts to our Meteor app.
* We don't want to modify any Meteor core packages.
* We don't want to do any data conflicts


##Useage
Call Meteor.linkWith[ServiceName] in place instead of loginWith


##Notes:

1. Piggyback on existing Meteor oauth login system.  That means using
   registerLoginHandler, instead of creating new namespace that correctly
   reflect this operation.

2. Does not link password account.  Which means, the case of register with
   github account, then later on, user wants to create password for this account on
   application site.

3. We don't allow link without current User.

4. We do not allow link different account from same service. For example, you
   could not login the application with 2 different github account.

5. Save the linked service info on user.services, instead of creating new field
   on user object.  This allow user logins the application from either
   services.

##License
MIT
