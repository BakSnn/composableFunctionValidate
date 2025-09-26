import { computed, reactive, ref } from "vue";

type Rule = (value: any) => true | string;

export function useValidatorForm<T extends Record<string, any>>(
    initValue: T,
    rules: Partial<Record<keyof T, Rule[]>>
) {
    const values = reactive({ ...initValue }) as T;

    const errors = ref<Record<keyof T, string[]>>(
        Object.keys(initValue).reduce((acc, key) => {
            acc[key as keyof T] = [];
            return acc;
        }, {} as Record<keyof T, string[]>)
    );

    function validateField(field: keyof T): boolean {
        errors.value[field] = [];
        const value = values[field];
        const fieldRules = rules[field] || [];
        fieldRules.forEach((rule) => {
            const result = rule(value);
            if (result !== true) {
                errors.value[field].push(result);
            }
        });
        return errors.value[field].length === 0;
    }

    function validateForm(): boolean {
        let valid = true;
        (Object.keys(values) as (keyof T)[]).forEach((field) => {
            if (!validateField(field)) valid = false;
        });
        return valid;
    }

    function resetForm() {
        (Object.keys(initValue) as (keyof T)[]).forEach((field) => {
            values[field] = initValue[field];
            errors.value[field] = [];
        });
    }

    const isFormValid = computed(() =>
        (Object.keys(errors.value) as (keyof T)[]).every(
            (field) => errors.value[field].length === 0
        )
    );

    return {
        values,
        errors,
        isFormValid,
        validateField,
        validateForm,
        resetForm,
    };
}
