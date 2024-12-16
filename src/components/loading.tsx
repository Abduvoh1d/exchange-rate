import OrbitProgress from "react-loading-indicators/OrbitProgress";

function Loading() {
    return (
        <div className={'w-full h-[80vh] flex items-center justify-center'}>
            <OrbitProgress variant="track-disc" dense color="#32cd32" size="medium" text="" textColor="" />
        </div>
    );
}

export default Loading;