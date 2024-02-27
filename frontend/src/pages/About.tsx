import React from "react";

// FadeInSection code FROM HERE:
// https://dev.to/selbekk/how-to-fade-in-content-as-it-scrolls-into-view-10j4
function FadeInSection(props: {
  children:
    | string
    | number
    | boolean
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | Iterable<React.ReactNode>
    | React.ReactPortal
    | null
    | undefined;
}) {
  const [isVisible, setVisible] = React.useState(false);
  const domRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        setVisible(entry.isIntersecting);
      });
    });

    const { current } = domRef;
    if (current) {
      observer.observe(current);
      return () => observer.unobserve(current);
    }
  }, []);
  return (
    <div
      className={`fade-in-section ${isVisible ? "is-visible" : ""}`}
      ref={domRef}
    >
      {props.children}
    </div>
  );
}

function About() {
  return (
    <>
      <div className="container">
        <div className="d-flex justify-content-center">
          <h1>About This Project:</h1>
        </div>
        <br />
        <FadeInSection>
          <div className="d-flex justify-content-center">
            <p>Hello everyone, welcome to Shipper!</p>
          </div>
          <br />
          <p>
            This application is intended to showcase some of my skills as a
            developer, as well as a workspace for my growth outside of
            employment in regards to languages, frameworks and common coding
            practices. This is the first project I've started from scratch that
            employs React.js, and it's supported by a Python/Django backend (of
            which I'm more familiar with). The intention of this app is to mimic
            social media using boats as the anchor for all content on the
            platform.
          </p>
        </FadeInSection>
        <br />
        <FadeInSection>
          <h3>Why I Built This App:</h3>
          <p>
            Beyond showcasing what I'm able to do currently alongside my
            capability to learn more as time progresses, I thought this would be
            a fun, low-pressure environment to learn something new. React.js as
            a framework seems to be taking all of frontend development by storm,
            and as someone whose industry experience was using basic
            JavaScript/HTML/CSS, I felt like I was soon to fall behind the curve
            if I didn't do something about my current abilities. As a result,
            I've built this - a fake social media platform surrounding... boats.
            For those curious, I'm not sure why I chose boats - I've never owned
            one, and they aren't of personal interest to me to the extent I
            would think of launching something like this in the real world.
            Nevertheless, here we are.
          </p>
        </FadeInSection>
        <br />
        <FadeInSection>
          <h3>What's Already Built:</h3>
          <p>
            This app/site is rather barebones, as I started this project in a
            "part-time" fashion around 2024/02/22. I'm still learning React.js,
            and honestly that's been the larger reason as to why there may not
            be many well-rounded functions on here as a real-industry social
            media app. Below are the functions that I plan to have available to
            anyone who looks at this app or chooses to launch it themselves:
            <br />
            <br />
            <ul>
              <li>
                Viewing vessels already on Shipper (at least on a local
                instance)
              </li>
              <li>Creating new vessels that are not on Shipper</li>
              <li>Updating the data of existing vessels on Shipper</li>
            </ul>
            Largely, this means I've built a backend API with the ability to
            manage some sort of object containing users' inputted data. Ideally,
            I'm working to build a site that allows users to do all of these
            interactions with a proper UI as opposed to an API tool (like
            Postman).
          </p>
        </FadeInSection>
        <br />
        <FadeInSection>
          <h3>What's Planned For the Future:</h3>
          <p>
            Depending on the point in time in which you've decided to download
            this project or view its progress, there's a chance that these have
            yet to be implemented. Below is a list of ideas I've had while
            scraping up some sort of MVP (Minimum Viable Product):
            <br />
            <br />
            <ul>
              <li>
                Sending Vessels on Voyages - being able to view Voyages, modify
                them, etc.
              </li>
              <li>
                Creating an account for a user, which would allow for a user
                profile (containing information such as a Bio, profile picture,
                owned vessels registered on Shipper, etc.)
              </li>
              <li>
                Creating posts, like most social media feeds. A post may contain
                text, photos, or things of that nature (as you may see from
                other social media)
              </li>
              <li>etc.</li>
            </ul>
            Some of these projects are already somewhat in the works, but they
            are not accessible via the frontend yet. These may not be extreme
            stretch goals, but they are something for me to work towards as an
            individual developer, and would allow for me to brush up on old
            skills while learning some new ones.
          </p>
        </FadeInSection>
        <br />
        <FadeInSection>
          <div className="d-flex justify-content-center">
            <h5>Thank you for reading, and enjoy looking around Shipper!</h5>
          </div>
        </FadeInSection>
      </div>
    </>
  );
}

export default About;
