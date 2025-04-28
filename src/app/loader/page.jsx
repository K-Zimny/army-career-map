import Loader from "@/components/loader/Loader";

export default function loader() {
  return (
    <>
      <Loader isLoading={true} />
      <div className="p-4">
        <h1 className="text-2xl font-bold">Your Career Path</h1>
        <div className="mt-6">
          <h2 className="text-lg font-semibold">Year 20</h2>
          <p>Age: 38</p>
          <p>
            After nearly two decades of dedicated service, you have reached the
            rank of Master Sergeant (MSG), a testament to your technical mastery
            and leadership in cyber and logistics operations. You have become a
            key advisor in your unit, leading complex projects that ensure the
            Army's communications and cyber defenses stay ahead of emerging
            threats. You have continued your professional development,
            completing the highest enlisted leadership courses and earning
            commendations for mission excellence. Financially, you have built a
            strong foundation with steady savings and a robust retirement
            account, supported by comprehensive military benefits. You have
            deployed multiple times overseas, contributing critical cyber
            expertise to joint operations. Your commitment and success position
            you well for a fulfilling transition to the civilian workforce or
            continued service.
          </p>
          <p>Rank: MSG</p>
          <p>Current Salary: $86000</p>
          <p>Savings: $120000</p>
          <p>Retirement: $90000</p>
          <p>Debt: $0</p>
          <p>Benefit Value to Date: $105000</p>
          <ul className="mt-2">
            <li>housing: $60000</li>
            <li>food: $36000</li>
            <li>healthcare: $14400</li>
            <li>education: $4500</li>
            <li>training: $16000</li>
          </ul>
          <ul className="mt-2">
            <li>- Promoted to Master Sergeant (MSG)</li>
            <li>- Completed Master Leader Course</li>
            <li>- Led critical cyber defense initiatives</li>
            <li>- Received Meritorious Service Medal</li>
            <li>- Deployed multiple times in cyber operations</li>
            <li>- Purchased a home</li>
          </ul>
        </div>
        <div className="mt-6">
          <h3 className="text-lg font-semibold">Make a Choice:</h3>
          <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">
            Pursue a civilian cybersecurity career leveraging Army experience
          </button>
          <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">
            Continue Army service aiming for Sergeant Major and senior enlisted
            leadership
          </button>
        </div>
      </div>
    </>
  );
}
