import functionlist from "./functionListDescriptor";

export default (localeFunctionList) => {
    functionlist.forEach(f => {
        const localeFunction = localeFunctionList[f.n];
        if (!localeFunction) {
            f.d = f.n;
            f.a = f.n;
            return;
        }
        f.d = localeFunction.d;
        f.a = localeFunction.a;
        f.p.forEach((p, i) => {
            if (localeFunction.p && localeFunction.p[i]) {
                Object.assign(p, localeFunction.p[i]);
            }
        });
    });

    return functionlist;
}


