import { ReactComponent as ScreenIcon } from "./icons/desktop-solid.svg";
import { ReactComponent as EyeIcon } from "./icons/eye-solid.svg";
import { ReactComponent as IDCardIcon } from "./icons/id-card-solid.svg";
import { ReactComponent as UserCheckIcon } from "./icons/user-check-solid.svg";
import { ReactComponent as ArrowIcon } from "./icons/arrow-down-solid.svg";
import { ReactComponent as ShareIcon } from "./icons/slideshare-brands.svg";
import { ReactComponent as VideoIcon } from "./icons/video-slash-solid.svg";

function FourBlock() {
    return (
        <div className="first-block">

            <div className="four-block">
                <div className="block-settle">
                    <div className="block-icon"> <IDCardIcon width="60" height="60" /></div>
                    <div className="block-title">대리 시험</div>
                </div>
                <div className="block-settle">
                    <div className="block-icon"> <VideoIcon width="60" height="60" /></div>
                    <div className="block-title">카메라 사각지대 응시</div>
                </div>
                <div className="block-settle">
                    <div className="block-icon"> <ScreenIcon width="60" height="60" /></div>
                    <div className="block-title">웹 서핑</div>
                </div>
                <div>
                    <ArrowIcon width="60" />
                </div>
                <div>
                    <ArrowIcon width="60" />
                </div>
                <div>
                    <ArrowIcon width="60" />
                </div>
                <div className="block-settle">
                    <div className="block-icon"> <UserCheckIcon width="60" height="60" /></div>
                    <div className="block-title">Facenet, Antispoofing</div>
                </div>
                <div className="block-settle">
                    <div className="block-icon"> <EyeIcon width="60" height="60" /></div>
                    <div className="block-title">Eye Tracking</div>
                </div>
                <div className="block-settle">
                    <div className="block-icon"> <ShareIcon width="60" height="60" /></div>
                    <div className="block-title">Screen Share</div>
                </div>
            </div>
        </div>
    )
}

export default FourBlock;