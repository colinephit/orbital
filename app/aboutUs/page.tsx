import Header from "../Header";

export default function aboutUs() {
  return (
    <div className="p-3">
      <Header title="About Us" />
      <div className="h-13">
        <div className="flex justify-center items-center">
          <img src="/AboutUs_1.png" className="object-center w-1/2" />
        </div>

        <p className="font-sans text-2xl">
          At Pawductivity Pup, we understand the challenges of maintaining
          productivity and focus, especially during long study or work sessions.
          In today's digital age, it's easy to turn to addictive apps for a
          quick distraction, but we believe there's a healthier way to destress
          and stay motivated.
        </p>
        <div className="flex justify-center items-center">
          <img src="/AboutUs_2_new.png" className="w-13 object-center" />
        </div>

        <p className="font-sans text-2xl">
          Our mission is to provide a digital platform that not only supports
          productivity but also encourages users to take breaks and engage in
          activities that promote well-being. Instead of succumbing to the
          allure of mindless scrolling, users can find solace in caring for
          their virtual pet dog during study breaks.
        </p>
        <div className="flex justify-center items-center">
          <img src="/new_coin.png" className="w-13 h-13" />
        </div>

        <p className="font-sans text-2xl">
          By completing tasks on their to-do list, users earn points that
          directly impact the well-being of their virtual companion. This unique
          approach not only incentivizes productivity but also fosters a sense
          of responsibility and connection to their digital pet.
        </p>
        <div className="flex justify-center items-center h-30">
          <img src="/new_brain.png" className="h-15" />
        </div>

        <p className="font-sans text-2xl">
          Our web app is designed to promote healthy study habits by encouraging
          regular breaks, incorporating periods of exercise, and emphasizing the
          importance of adequate rest. We believe that by integrating these
          elements, users can achieve their goals while maintaining balance and
          overall well-being.
        </p>

        <br></br>
        <p className="text-center">
          Special thanks to @mousyrina for the pup animations
        </p>
      </div>
    </div>
  );
}
