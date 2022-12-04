import { Vortex } from  'react-loader-spinner'
import css from './Loader.module.css';

export const Loader = () => {
    return (
        <div className={css.Loader}>
            <Vortex
                visible={true}
                height="15%"
                width="15%"
                ariaLabel="vortex-loading"
                wrapperStyle={{}}
                wrapperClass="vortex-wrapper"
                colors={['red', 'green', 'blue', 'yellow', 'orange', 'purple']}
            />
        </div>
    );
};

export default Loader;