const frist = (ref, uE) => {
    uE(() => {
        const firstRender = ref.current;

        if (firstRender) {
            ref.current = false;
            console.log('First Render');
        } else {
            console.log('Not a first Render');
        }
    }, []);

    return () => {
        return ref.current?true:false
    }
}

exports.frist = frist;