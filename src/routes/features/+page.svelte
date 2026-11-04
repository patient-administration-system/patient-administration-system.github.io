<script lang="ts">
  import { Card } from "@lilydesignsystem/svelte-headless";
  import Meta from "#lib/Meta.svelte";
  import { repo } from "#lib/site.js";
</script>

<Meta
  title="Features"
  description="What the Patient Administration System does: escalating reminders, replies that act, waiting lists, virtual visits, transport requests and fairness measurement."
  path="/features"
/>

<div class="site-width site-page">
  <h1>Features</h1>
  <p class="site-lead">
    The system runs the administrative side of patient care. It holds no diagnoses, prescriptions or vitals.
  </p>

  <div class="site-cards">
    <Card heading="Reminders that escalate, safely" headingLevel={2}>
      <p>
        A ladder at 7 days, 4 days, 3 days and 24 hours, over text, WhatsApp, email or the portal, in English or Welsh.
        A patient who stays silent is escalated to a person to phone. Opt-outs, quiet hours and consent are enforced at
        the one point every message passes.
      </p>
    </Card>
    <Card heading="Replies that act" headingLevel={2}>
      <p>
        Patients can confirm, cancel, ask for another time or ask for help, by text reply, a single-use link or a voice
        keypad. Another time means real alternatives are offered. Every action is idempotent and audited.
      </p>
    </Card>
    <Card heading="Fewer wasted slots" headingLevel={2}>
      <p>
        Released slots are offered to standby patients. Cancellations ask for a reason and answer with help that fits.
      </p>
    </Card>
    <Card heading="Waiting lists and RTT clocks" headingLevel={2}>
      <p>Referral-to-treatment clocks, and "still needed?" checks for long waits.</p>
    </Card>
    <Card heading="Virtual visits and transport" headingLevel={2}>
      <p>Video or phone visits with a phone fallback, and transport requests behind a provider interface.</p>
    </Card>
    <Card heading="Fairness you can measure" headingLevel={2}>
      <p>
        A privacy-safe analytics feed with small cells hidden and a query budget, wording experiments, and a
        postcode-based deprivation lookup the health board supplies.
      </p>
    </Card>
    <Card heading="An optional no-show score, support only" headingLevel={2}>
      <p>
        Off until named people approve it. A transparent weighted sum, shown to staff as a band with reasons, used only
        to add a phone call, and rolled out one clinic at a time after a shadow period.
        <a href={repo("governance/noshow-model.md")}>Read the model</a>.
      </p>
    </Card>
    <Card heading="Accessible and multilingual" headingLevel={2}>
      <p>
        Ten locales, WCAG 2.2 AA checks in continuous integration, keyboard and 320-pixel reflow tests, and sign-in with
        Keycloak and one-time codes for staff. The translations are first drafts awaiting fluent review.
      </p>
    </Card>
    <Card heading="Tested against misuse" headingLevel={2}>
      <p>
        Seeded chaos tests send hostile input to every route, fail the carrier, race the booking, and make the API
        misbehave under the UI. <a href={repo("governance/chaos-testing.md")}>Read how</a>.
      </p>
    </Card>
  </div>
</div>
