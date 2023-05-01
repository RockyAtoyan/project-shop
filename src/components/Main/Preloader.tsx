import React from "react"
import ContentLoader from "react-content-loader"

const Loader = (props:any) => (
    <ContentLoader
        speed={2}
        width={366}
        height={478}
        viewBox="0 0 320 478"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        {...props}
    >
        <rect x="-144" y="2" rx="0" ry="0" width="523" height="295" />
        <rect x="4" y="309" rx="0" ry="0" width="178" height="20" />
        <rect x="302" y="311" rx="0" ry="0" width="2" height="6" />
        <rect x="288" y="309" rx="0" ry="0" width="72" height="21" />
        <rect x="322" y="317" rx="0" ry="0" width="1" height="0" />
        <rect x="-115" y="337" rx="0" ry="0" width="486" height="34" />
        <rect x="-32" y="387" rx="0" ry="0" width="407" height="36" />
        <rect x="28" y="413" rx="0" ry="0" width="1" height="0" />
        <rect x="0" y="441" rx="0" ry="0" width="422" height="85" />
    </ContentLoader>
)


export const Preloader = () => {
    return <div className={'products preloader'}>
        {Array(8).fill(1).map((value, index) => {
            return <Loader key={index} />
        })}
    </div>
}