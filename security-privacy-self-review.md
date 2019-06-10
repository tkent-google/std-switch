
Note that security and privacy implication of this feature is same as `<input type=checkbox>`.  Also, we intend to implmeent this feature as a JavaScript module.  So it won't have new security/privacy issues

### 2.1. What information might this feature expose to Web sites or other parties, and for what purposes is that exposure necessary?

A user can toggle the staus of an elemenet betwen "on" and "off", and it will be included in a form submission.  The platform can't know the purppose of the status, and it depends on web applications.

### 2.2. Is this specification exposing the minimum amount of information necessary to power the feature?

Yes

### 2.3. How does this specification deal with personal information or personally-identifiable information or information derived thereof?

The element passes user-spcified state to form submission without any modification.

### 2.4. How does this specification deal with sensitive information?

Ditto.

### 2.5. Does this specification introduce new state for an origin that persists across browsing sessions?

No.

### 2.6. What information from the underlying platform, e.g. configuration data, is exposed by this specification to an origin?

When platform-specific apperance is enabled, user's platform can be detectable.  This information would be a subset of User-Agent header or `navigator.platform`.

### 2.7. Does this specification allow an origin access to sensors on a user’s device

No.

### 2.8. What data does this specification expose to an origin? Please also document what data is identical to data exposed by other features, in the same or different contexts.

The "on" "off" state can be sent to another origin via form submission.
JavaScript code can detect user's platform as described in 2.6.  If CSP introduced a policy to hide `navigator.platform`, platform-specific appearance of the feature should be disabled too.

### 2.9. Does this specification enable new script execution/loading mechanisms?

No.

### 2.10. Does this specification allow an origin to access other devices?

No.

### 2.11. Does this specification allow an origin some measure of control over a user agent’s native UI?

No.

### 2.12. What temporary identifiers might this this specification create or expose to the web?

None.

### 2.13. How does this specification distinguish between behavior in first-party and third-party contexts?

The feature doesn't distinguish them.  This feature won't expose new information/capability to any origins.

### 2.14. How does this specification work in the context of a user agent’s Private \ Browsing or "incognito" mode?

No special handling in such modes.  It's impossible to detect the mode or fingprint with this feature.

### 2.15. Does this specification have a "Security Considerations" and "Privacy Considerations" section?

[The current explainer has it](https://github.com/tkent-google/std-switch/blob/master/README.md#security-and-privacy-considerations).

### 2.16. Does this specification allow downgrading default security characteristics?

No.

### 2.17. What should this questionnaire have asked?

No idea of other questions.
