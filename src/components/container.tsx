import clsx from "clsx";
import {HTMLAttributes} from "react";

export const Container = ({
                              children,
                              className = '',
                              ...props
                          }: HTMLAttributes<HTMLDivElement> & { className?: string }) => {
    return (
        <section
            // px-3 md:px-6 lg:px-10
            className={clsx({
                'px-2 md:px-10 lg:px-14 xl:px-20 2xl:px-32': true,
                [className as string]: className,
            })}
            // css={css`
            //   max-width: 1700px;
            //   margin: 0 auto;
            // `}
            {...props}
        >
            {children}
        </section>
    );
};