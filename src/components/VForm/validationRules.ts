export default {
  rules: {
    after(value: string, referenceDate: string): boolean | string {
      return new Date(value) > new Date(referenceDate) || `Дата должна быть после ${referenceDate}`;
    },

    alpha(value: string): boolean | string {
      return /^[A-Za-zА-Яа-яЁё]+$/.test(value) || 'Только буквы допустимы';
    },

    alpha_dash(value: string): boolean | string {
      return /^[A-Za-zА-Яа-яЁё0-9_-]+$/.test(value) || 'Разрешены только буквы, цифры, дефисы и подчеркивания';
    },

    alpha_num(value: string): boolean | string {
      return /^[A-Za-zА-Яа-яЁё0-9]+$/.test(value) || 'Разрешены только буквы и цифры';
    },

    alpha_spaces(value: string): boolean | string {
      return /^[A-Za-zА-Яа-яЁё\s]+$/.test(value) || 'Разрешены только буквы и пробелы';
    },

    before(value: string, referenceDate: string): boolean | string {
      return new Date(value) < new Date(referenceDate) || `Дата должна быть до ${referenceDate}`;
    },

    between(value: string, min: string, max: string): boolean | string {
      const actualValue = Number(value);
      return (actualValue >= Number(min) && actualValue <= Number(max)) || `Значение должно быть между ${min} и ${max}`;
    },

    confirmed(value: string, confirmedValue: string): boolean | string {
      return value === confirmedValue || 'Значения не совпадают';
    },

    credit_card(value: string): boolean | string {
      return /^\d{4}-\d{4}-\d{4}-\d{4}$/.test(value) || 'Неверный формат номера кредитной карты';
    },

    date_between(value: string, startDate: string, endDate: string): boolean | string {
      return (
        (new Date(value) >= new Date(startDate) && new Date(value) <= new Date(endDate)) ||
        `Дата должна быть между ${startDate} и ${endDate}`
      );
    },

    // date_format(value: string, format: string): boolean | string {
    //   return moment(value, format, true).isValid() || `Неверный формат даты. Ожидается формат ${format}`;
    // },

    decimal(value: string): boolean | string {
      return /^\d+(\.\d{1,2})?$/.test(value) || 'Неверный формат числа';
    },

    digits(value: string): boolean | string {
      return /^\d+$/.test(value) || 'Только цифры допустимы';
    },

    image(file: File): boolean | string {
      const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];
      const extension = file.name.split('.').pop()?.toLowerCase();
      return allowedExtensions.includes(extension || '') || 'Разрешены только файлы изображений (jpg, jpeg, png, gif)';
    },

    included(value: string, list: string[]): boolean | string {
      return list.includes(value) || 'Значение не включено в список';
    },

    integer(value: string): boolean | string {
      return Number.isInteger(Number(value)) || 'Должно быть целым числом';
    },

    ip(value: string): boolean | string {
      return /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(value) || 'Неверный формат IP-адреса';
    },

    ip_or_fqdn(value: string): boolean | string {
      const ipRegex = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;
      const domainRegex = /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return ipRegex.test(value) || domainRegex.test(value) || 'Неверный формат IP-адреса или доменного имени';
    },

    is(value: string, comparisonValue: string): boolean | string {
      return value === comparisonValue || 'Значение не соответствует требуемому';
    },

    is_not(value: string, comparisonValue: string): boolean | string {
      return value !== comparisonValue || 'Значение совпадает с запрещенным';
    },

    length(value: string, length: string | number): boolean | string {
      return value.length === Number(length) || `Длина должна быть равной ${length}`;
    },

    max(value: number, maxValue: number): boolean | string {
      return value <= maxValue || `Значение должно быть меньше или равно ${maxValue}`;
    },

    min(value: number, minValue: number): boolean | string {
      return value >= minValue || `Значение должно быть больше или равно ${minValue}`;
    },

    mimes(file: File, types: string): boolean | string {
      const allowedTypes = types.split(',');
      const extension = file.name.split('.').pop()?.toLowerCase();
      return (
        allowedTypes.includes(file.type) || allowedTypes.includes(extension || '') || `Допустимые типы файлов: ${types}`
      );
    },

    numeric(value: string): boolean | string {
      return (!isNaN(parseFloat(value)) && isFinite(Number(value))) || 'Должно быть числом';
    },

    regex(value: string, regex: RegExp): boolean | string {
      return regex.test(value) || 'Неверный формат';
    },

    required(value: any): boolean | string {
      return !!value || 'Обязательное поле';
    },

    required_if(value: any, conditionValue: any): boolean | string {
      return !!conditionValue ? !!value || 'Обязательное поле' : true;
    },

    size(file: File, maxSize: number): boolean | string {
      return file.size <= maxSize || `Размер файла должен быть не более ${maxSize} байт`;
    },

    url(value: string): boolean | string {
      return /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?$/.test(value) || 'Неверный формат URL-адреса';
    }
  }
};
