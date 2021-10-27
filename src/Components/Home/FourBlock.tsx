import { ReactComponent as ScreenIcon } from "./icons/desktop-solid.svg";
import { ReactComponent as EyeIcon } from "./icons/eye-solid.svg";
import { ReactComponent as IDCardIcon } from "./icons/id-card-solid.svg";
import { ReactComponent as UserCheckIcon } from "./icons/user-check-solid.svg";

function FourBlock() {
    return (
        <div className="first-block">

            <div className="four-block">
                <div className="block-settle">
                    <IDCardIcon width="60" height="60" />
                    <div className="block-title">OCR Tech</div>
                    <div className="block-content"></div>
                </div>
                <div className="block-settle">
                    <UserCheckIcon width="60" height="60" />
                    <div className="block-title">Antispoofing</div>
                    <div className="block-content">부정행위를 막습니다.</div>
                </div>
                <div className="block-settle">
                    <EyeIcon width="60" height="60" />
                    <div className="block-title">Eyetracking</div>
                    <div className="block-content">부정행위를 막습니다.</div>
                </div>
                <div className="block-settle">
                    <ScreenIcon width="60" height="60" />
                    <div className="block-title">ScreenSharing</div>
                    <div className="block-content">부정행위를 막습니다.</div>
                </div>
            </div>
        </div>
    )
}

export default FourBlock;