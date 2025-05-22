const NoShowWorkflow = () => {
  return (
    <div className="max-w-4xl mx-auto p-4 space-y-8">
      <h1 className="text-lg font-semibold text-gray-800">No-Show Workflow</h1>

      <section className="space-y-4 text-base">
        <p className="text-gray-700">
          What happens when a lead doesn’t show up for the call?
        </p>
      </section>

      <section className="space-y-4 text-base">
        <h2 className="text-xl font-semibold text-gray-800">
          Step A - 2 Minutes After The Start Time
        </h2>
        <ul className="list-disc pl-5 text-gray-700 space-y-2">
          <li>
            Phone them and work through the issue. Make sure you dial them 2
            times and use a phone number with an area code that they would
            recognise.
          </li>
          <li>
            If they don’t answer your calls, send them a message with memes.
          </li>
        </ul>
      </section>

      <section className="space-y-4 text-base">
        <h2 className="text-xl font-semibold text-gray-800">
          Step B - 5 Minutes After The Start Time
        </h2>
        <ul className="list-disc pl-5 text-gray-700 space-y-2">
          <li>Phone them 2 times again.</li>
          <li>Send them this message:</li>
        </ul>
        <blockquote className="p-4 bg-gray-50 rounded-lg border-l-4 border-gray-400 text-gray-700">
          <p>
            "Hey "name" , you having an issue connecting? You still joining me?
            I’m going to wait 5 more mins before I have to cancel the call."
          </p>
        </blockquote>
      </section>

      <section className="space-y-4 text-base">
        <h2 className="text-xl font-semibold text-gray-800">
          Step C - 10 Minutes After The Start Time
        </h2>
        <ul className="list-disc pl-5 text-gray-700 space-y-2">
          <li>End the call, send them a link to reschedule.</li>
          <li>Here’s an example of a message to send:</li>
        </ul>
        <blockquote className="p-4 bg-gray-50 rounded-lg border-l-4 border-gray-400 text-gray-700">
          <p>
            "Hey "name", I know how hectic life can get so I’m sure there was a
            genuine reason why you couldn’t make our call today. Here’s a link
            to choose a new time: "reschedule link"
          </p>
        </blockquote>
      </section>

      <section className="space-y-4 text-base">
        <h2 className="text-xl font-semibold text-gray-800">
          Step D - Move To Long Term Nurture
        </h2>
        <ul className="list-disc pl-5 text-gray-700 space-y-2">
          <li>
            Continue to send them new resources and YouTube videos on a weekly
            basis to keep yourself top of mind.
          </li>
        </ul>
      </section>
    </div>
  );
};

export default NoShowWorkflow;
