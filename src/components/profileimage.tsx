export default function ProfileImage({session,styles}){

    return (
      <div className={`profile rounded-full  p-0.5  ${styles}` }>
        <img
          src={session?.user?.image || `/empty-profile.jpg`}
          className="w-full rounded-full"
        ></img>
      </div>
    );
}