(function() {
    function validator(target, validator) {
        return new Proxy(target,{
            // 自定义属性
            _validator: validator,
            //set方法用来拦截某个属性的赋值操作，可以接受四个参数，依次为目标对象、属性名、属性值和 Proxy 实例本身，其中最后一个参数可选。
            set(target, key, value, proxy) {
                if (target.hasOwnProperty(key)) {
                    let va = this._validator[key];
                    if (!!va(value)) {
                           
                        return Reflect.set(target, key, value, proxy);
                    } else {
//                         console.log(proxy)
                        throw Error(`验证失败，${key}不能接受值${value}`);
                    }
                } else {
                    throw Error(`${key}不存在`);
                }
            },
        });
    }

    const personValidators = {
        name(val) {
            return typeof val === 'string';
        },
        age(val) {
            return typeof val === 'number' && val > 18;
        },
    };

    class Person {
        constructor(name, age) {
            this.name = name;
            this.age = age;
            return validator(this, personValidators);
        }
    }
    const person = new Person('knyel',30);
    console.log(person);
    // {name: 'knyel', age: 30}
    person.name = 'lk';
    console.log(person);
    // {name: 'lk', age: 30}
    person.age = 12;
    console.log(person);
    // 验证失败，age不能接受值12
}
)();
