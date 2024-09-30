import { getMe } from "@/action/profileHandler";
import { Profile } from "@/components/profile/Profile";

const ProfilePage = async () => {
    const userData = await getMe();
    console.log(userData,'userData')
    return (
        <div className="p-4">
            <Profile userData={userData.data.user} />
        </div>
    )
}

export default ProfilePage;