export default function ProfileImage({styles,image,imgStyles}){

    return (
      <div className={`profile rounded-full  p-0.5  ${styles}` }>
        <img
          src={image || `/empty-profile.jpg`}
          className={`w-full h-full max-w-full rounded-full object-cover ${imgStyles}`}
        ></img>
      </div>
    );
}