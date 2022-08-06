import { useState } from "react";
import { motion } from "framer-motion"
import styled from "styled-components";

const StyledCover = styled(motion.div)`
    left: 0;
    height: 100%;
    width: 100%;
    position: absolute;
    border-radius: 0.5rem;
    user-select: none;
    z-index: 10000;
    opacity: 0.999;
    background-position: center;
    background-color: #ffffff;
    background-image: url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%27100%25%27 height=%27100%25%27 viewBox=%270 0 100 60%27%3E%3Cg fill-opacity=%270.27%27%3E%3Crect fill=%27%23000000%27 width=%2711%27 height=%2711%27/%3E%3Crect fill=%27%23060606%27 x=%2710%27 width=%2711%27 height=%2711%27/%3E%3Crect fill=%27%230c0c0c%27 y=%2710%27 width=%2711%27 height=%2711%27/%3E%3Crect fill=%27%23111111%27 x=%2720%27 width=%2711%27 height=%2711%27/%3E%3Crect fill=%27%23151515%27 x=%2710%27 y=%2710%27 width=%2711%27 height=%2711%27/%3E%3Crect fill=%27%23181818%27 y=%2720%27 width=%2711%27 height=%2711%27/%3E%3Crect fill=%27%231c1c1c%27 x=%2730%27 width=%2711%27 height=%2711%27/%3E%3Crect fill=%27%231f1f1f%27 x=%2720%27 y=%2710%27 width=%2711%27 height=%2711%27/%3E%3Crect fill=%27%23232323%27 x=%2710%27 y=%2720%27 width=%2711%27 height=%2711%27/%3E%3Crect fill=%27%23262626%27 y=%2730%27 width=%2711%27 height=%2711%27/%3E%3Crect fill=%27%232a2a2a%27 x=%2740%27 width=%2711%27 height=%2711%27/%3E%3Crect fill=%27%232d2d2d%27 x=%2730%27 y=%2710%27 width=%2711%27 height=%2711%27/%3E%3Crect fill=%27%23313131%27 x=%2720%27 y=%2720%27 width=%2711%27 height=%2711%27/%3E%3Crect fill=%27%23353535%27 x=%2710%27 y=%2730%27 width=%2711%27 height=%2711%27/%3E%3Crect fill=%27%23383838%27 y=%2740%27 width=%2711%27 height=%2711%27/%3E%3Crect fill=%27%233c3c3c%27 x=%2750%27 width=%2711%27 height=%2711%27/%3E%3Crect fill=%27%23404040%27 x=%2740%27 y=%2710%27 width=%2711%27 height=%2711%27/%3E%3Crect fill=%27%23444444%27 x=%2730%27 y=%2720%27 width=%2711%27 height=%2711%27/%3E%3Crect fill=%27%23484848%27 x=%2720%27 y=%2730%27 width=%2711%27 height=%2711%27/%3E%3Crect fill=%27%234c4c4c%27 x=%2710%27 y=%2740%27 width=%2711%27 height=%2711%27/%3E%3Crect fill=%27%23505050%27 y=%2750%27 width=%2711%27 height=%2711%27/%3E%3Crect fill=%27%23545454%27 x=%2760%27 width=%2711%27 height=%2711%27/%3E%3Crect fill=%27%23585858%27 x=%2750%27 y=%2710%27 width=%2711%27 height=%2711%27/%3E%3Crect fill=%27%235c5c5c%27 x=%2740%27 y=%2720%27 width=%2711%27 height=%2711%27/%3E%3Crect fill=%27%23606060%27 x=%2730%27 y=%2730%27 width=%2711%27 height=%2711%27/%3E%3Crect fill=%27%23646464%27 x=%2720%27 y=%2740%27 width=%2711%27 height=%2711%27/%3E%3Crect fill=%27%23686868%27 x=%2710%27 y=%2750%27 width=%2711%27 height=%2711%27/%3E%3Crect fill=%27%236c6c6c%27 x=%2770%27 width=%2711%27 height=%2711%27/%3E%3Crect fill=%27%23717171%27 x=%2760%27 y=%2710%27 width=%2711%27 height=%2711%27/%3E%3Crect fill=%27%23757575%27 x=%2750%27 y=%2720%27 width=%2711%27 height=%2711%27/%3E%3Crect fill=%27%23797979%27 x=%2740%27 y=%2730%27 width=%2711%27 height=%2711%27/%3E%3Crect fill=%27%237d7d7d%27 x=%2730%27 y=%2740%27 width=%2711%27 height=%2711%27/%3E%3Crect fill=%27%23828282%27 x=%2720%27 y=%2750%27 width=%2711%27 height=%2711%27/%3E%3Crect fill=%27%23868686%27 x=%2780%27 width=%2711%27 height=%2711%27/%3E%3Crect fill=%27%238a8a8a%27 x=%2770%27 y=%2710%27 width=%2711%27 height=%2711%27/%3E%3Crect fill=%27%238f8f8f%27 x=%2760%27 y=%2720%27 width=%2711%27 height=%2711%27/%3E%3Crect fill=%27%23939393%27 x=%2750%27 y=%2730%27 width=%2711%27 height=%2711%27/%3E%3Crect fill=%27%23989898%27 x=%2740%27 y=%2740%27 width=%2711%27 height=%2711%27/%3E%3Crect fill=%27%239c9c9c%27 x=%2730%27 y=%2750%27 width=%2711%27 height=%2711%27/%3E%3Crect fill=%27%23a1a1a1%27 x=%2790%27 width=%2711%27 height=%2711%27/%3E%3Crect fill=%27%23a5a5a5%27 x=%2780%27 y=%2710%27 width=%2711%27 height=%2711%27/%3E%3Crect fill=%27%23aaaaaa%27 x=%2770%27 y=%2720%27 width=%2711%27 height=%2711%27/%3E%3Crect fill=%27%23aeaeae%27 x=%2760%27 y=%2730%27 width=%2711%27 height=%2711%27/%3E%3Crect fill=%27%23b3b3b3%27 x=%2750%27 y=%2740%27 width=%2711%27 height=%2711%27/%3E%3Crect fill=%27%23b7b7b7%27 x=%2740%27 y=%2750%27 width=%2711%27 height=%2711%27/%3E%3Crect fill=%27%23bcbcbc%27 x=%2790%27 y=%2710%27 width=%2711%27 height=%2711%27/%3E%3Crect fill=%27%23c1c1c1%27 x=%2780%27 y=%2720%27 width=%2711%27 height=%2711%27/%3E%3Crect fill=%27%23c5c5c5%27 x=%2770%27 y=%2730%27 width=%2711%27 height=%2711%27/%3E%3Crect fill=%27%23cacaca%27 x=%2760%27 y=%2740%27 width=%2711%27 height=%2711%27/%3E%3Crect fill=%27%23cfcfcf%27 x=%2750%27 y=%2750%27 width=%2711%27 height=%2711%27/%3E%3Crect fill=%27%23d4d4d4%27 x=%2790%27 y=%2720%27 width=%2711%27 height=%2711%27/%3E%3Crect fill=%27%23d8d8d8%27 x=%2780%27 y=%2730%27 width=%2711%27 height=%2711%27/%3E%3Crect fill=%27%23dddddd%27 x=%2770%27 y=%2740%27 width=%2711%27 height=%2711%27/%3E%3Crect fill=%27%23e2e2e2%27 x=%2760%27 y=%2750%27 width=%2711%27 height=%2711%27/%3E%3Crect fill=%27%23e7e7e7%27 x=%2790%27 y=%2730%27 width=%2711%27 height=%2711%27/%3E%3Crect fill=%27%23ebebeb%27 x=%2780%27 y=%2740%27 width=%2711%27 height=%2711%27/%3E%3Crect fill=%27%23f0f0f0%27 x=%2770%27 y=%2750%27 width=%2711%27 height=%2711%27/%3E%3Crect fill=%27%23f5f5f5%27 x=%2790%27 y=%2740%27 width=%2711%27 height=%2711%27/%3E%3Crect fill=%27%23fafafa%27 x=%2780%27 y=%2750%27 width=%2711%27 height=%2711%27/%3E%3Crect fill=%27%23FFFFFF%27 x=%2790%27 y=%2750%27 width=%2711%27 height=%2711%27/%3E%3C/g%3E%3C/svg%3E");
    background-size: cover;
    box-shadow: rgb(0 0 0 / 16%) 0px 1px 8px, rgb(248 248 248) 0px 0px 0px 6px;
`

export default function Cover() {

    const [isCoverClosed, setIsCoverClose] = useState(false);

    function onCoverClick() {
        setIsCoverClose((isCoverClosed) => !isCoverClosed)
    }

    return <StyledCover
        layout
        style={{ top: !isCoverClosed ? "-0.5rem" : "-112%" }}
        onClick={onCoverClick}
    />
}