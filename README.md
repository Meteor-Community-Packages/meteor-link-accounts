#Meteor Link Accounts
A Meteor package designed to links social network accounts without any hassles.

##Goals
* Link additional social network accounts to our Meteor app.
* Don't want to modify any Meteor core packages.
* Don't want to do any additional works.
* Don't force users to add additional Meteor packages that they are not going to
  use.

##Useage
Call Meteor.linkWith[ServiceName] in place instead of loginWith


##Notes:
1. Piggyback on existing Meteor oauth login system.

2. Does not link password account. 

3. We don't allow link without current user in Meteor app.

4. We do not allow link different account from same service. For example, you
   could not login the application with 2 different github accounts.

5. Save the linked service info on user.services, instead of creating new field
   on user object.  This allow user logins the application from either
   services.

##License
MIT
