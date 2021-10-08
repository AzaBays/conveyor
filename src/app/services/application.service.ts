import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Validators } from '@angular/forms';
import { DateValidator } from '../shared/date.validator';

@Injectable({
  providedIn: 'root',
})
export class ApplicationService {
  applicationTabs = [
    {
      label: 'Заявление',
      value: 'statement',
    },
    {
      label: 'Анкета',
      value: 'questionnaire',
    },
    {
      label: 'Решения',
      value: 'decisions',
    },
    {
      label: 'Заключения',
      value: 'conclusions',
    },
    {
      label: 'Документы',
      value: 'files',
    },
  ];

  guarantorType = [
    {
      key: 0,
      value: 'Частное лицо',
    },
    {
      key: 1,
      value: 'Юридеческое лицо',
    },
    {
      key: 2,
      value: 'Третье лицо',
    },
  ];

  validators = {
    1: Validators.required,
    2: Validators.email,
    3: DateValidator.dateValidator,
  };

  cards = {
    statementCards: [
      {
        id: 1,
        title: 'Личные данные клиента',
        name: 'clientData',
        icon: 'fas fa-user',
        iconColor: '#C4C4C4',
        description:
          'Если ИАБС отправил данные, то Заёмщик является клиентом Банка и система подставляет полученные данные в необходимые поля.',
        formCompleted: 0,
        form: [
          {
            parentList: 'statementCards',
            parentId: 1,
            fieldType: 'text',
            controlName: 'firstName',
            title: 'Имя',
            placeholder: 'Заполните поле',
            hintText: 'Внесите имя клиента',
            errorText: 'Обязательное поле для заполнения',
            options: null,
            readonly: false,
            mask: /^\D+$/,
            prefix: null,
            suffix: null,
            validators: [this.validators[1]],
            isCompleted: false,
            fieldIcon: null,
            iconPosition: null,
          },
          {
            parentList: 'statementCards',
            parentId: 1,
            fieldType: 'text',
            controlName: 'lastName',
            title: 'Фамилия',
            placeholder: 'Заполните поле',
            hintText: 'Внесите фамилию клиента',
            errorText: 'Обязательное поле для заполнения',
            options: null,
            readonly: false,
            mask: /^\D+$/,
            prefix: null,
            suffix: null,
            validators: [this.validators[1]],
            isCompleted: false,
            fieldIcon: null,
            iconPosition: null,
          },
          {
            parentList: 'statementCards',
            parentId: 1,
            fieldType: 'text',
            controlName: 'phone',
            title: 'Телефон',
            placeholder: '+998 00 123-45-67',
            hintText: 'Введите телефон в формате +998 00 123-45-67',
            errorText: 'Обязательное поле для заполнения',
            options: null,
            readonly: false,
            mask: '+000 00 000-00-00',
            prefix: '+',
            suffix: null,
            validators: [this.validators[1]],
            isCompleted: false,
            fieldIcon: 'uil-phone',
            iconPosition: 'prepend',
          },
          {
            parentList: 'statementCards',
            parentId: 1,
            fieldType: 'text',
            controlName: 'email',
            title: 'E-mail',
            placeholder: 'info@info.com',
            hintText: 'Введите почту в формате info@info.com',
            errorText: 'Обязательное поле для заполнения',
            options: null,
            readonly: false,
            mask: null,
            prefix: '+',
            suffix: null,
            validators: [this.validators[1], this.validators[2]],
            isCompleted: false,
            fieldIcon: 'uil-at',
            iconPosition: 'prepend',
          },
          {
            parentList: 'statementCards',
            parentId: 1,
            fieldType: 'datepicker',
            controlName: 'birthDate',
            title: 'Дата рождения',
            placeholder: 'дд.мм.гггг',
            hintText: 'Внесите дату рождения клиента',
            errorText: 'Обязательное поле для заполнения',
            options: null,
            readonly: false,
            mask: null,
            prefix: null,
            suffix: null,
            validators: [this.validators[1], this.validators[3]],
            isCompleted: false,
            fieldIcon: 'uil-calendar-alt',
            iconPosition: 'append',
          },
          {
            parentList: 'statementCards',
            parentId: 1,
            fieldType: 'select',
            controlName: 'guarantorType',
            title: 'Тип поручителя',
            placeholder: 'Выберите тип поручителя',
            hintText: 'Выберите тип поручителя',
            errorText: 'Обязательное поле для заполнения',
            options: this.guarantorType,
            readonly: false,
            mask: null,
            prefix: null,
            suffix: null,
            validators: [this.validators[1]],
            isCompleted: false,
            fieldIcon: null,
            iconPosition: null,
          },
        ],
      },
      {
        id: 2,
        title: 'Выданные поручительства в пользу третих лиц',
        name: 'issuedGuarantees',
        icon: 'uil-star',
        iconColor: '#F3C400',
        description:
          'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.',
        formCompleted: '100',
      },
      {
        id: 3,
        title: 'Информация по запрашиваемому кредиту',
        name: 'loanInfo',
        icon: 'uil-info-circle',
        iconColor: '#4AB8FF',
        description:
          'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.',
        formCompleted: '50',
      },
    ],
    questionnaireCards: [
      {
        id: 11,
        title: 'Личные данные клиента',
        name: 'clientData',
        icon: 'fas fa-user',
        iconColor: '#C4C4C4',
        description:
          'Если ИАБС отправил данные, то Заёмщик является клиентом Банка и система подставляет полученные данные в необходимые поля.',
        formCompleted: '20',
      },
      {
        id: 12,
        title: 'Выданные поручительства в пользу третих лиц',
        name: 'issuedGuarantees',
        icon: 'uil-star',
        iconColor: '#F3C400',
        description:
          'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.',
        formCompleted: '100',
      },
      {
        id: 13,
        title: 'Информация по запрашиваемому кредиту',
        name: 'loanInfo',
        icon: 'uil-info-circle',
        iconColor: '#4AB8FF',
        description:
          'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.',
        formCompleted: '50',
      },
      {
        id: 14,
        title: 'Информация о заявителе',
        name: 'applicantInfo',
        icon: 'fas fa-user',
        iconColor: '#C4C4C4',
        description:
          'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.',
        formCompleted: '20',
      },
      {
        id: 15,
        title: 'Данные бизнес-плана заявителя',
        name: 'applicantBusinessPlanInfo',
        icon: 'uil-file-copy-alt',
        iconColor: '#677192',
        description:
          'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.',
        formCompleted: '46',
      },
      {
        id: 16,
        title: 'Кредитный продукт',
        name: 'creditProduct',
        icon: 'uil-credit-card',
        iconColor: '#04C7B0',
        description:
          'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.',
        formCompleted: '78',
      },
      {
        id: 17,
        title: 'Основные параметры заявки',
        name: 'applicationParameters',
        icon: 'uil-setting',
        iconColor: '#4AB8FF',
        description:
          'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.',
        formCompleted: '34',
      },
      {
        id: 18,
        title: 'Источники финансирования (если да - МФИ)',
        name: 'fundingInfo',
        icon: 'uil-receipt-alt',
        iconColor: '#F3C400',
        description:
          'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.',
        formCompleted: '34',
      },
      {
        id: 19,
        title: 'Процентные ставки',
        name: 'interestRates',
        icon: 'uil-percentage',
        iconColor: '#FA3F4D',
        description:
          'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.',
        formCompleted: '66',
      },
      {
        id: 20,
        title: 'Сведения о контракте',
        name: 'contractDetails',
        icon: 'uil-receipt',
        iconColor: '#04C7B0',
        description:
          'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.',
        formCompleted: '66',
      },
      {
        id: 21,
        title: 'Экологическая и социальная оценка',
        name: 'envSocAssessment',
        icon: 'uil-bag',
        iconColor: '#677192',
        description:
          'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.',
        formCompleted: '55',
      },
      {
        id: 22,
        title: 'Импорт-экспорт контракты',
        name: 'importExportContracts',
        icon: 'uil-file-download-alt',
        iconColor: '#F3C400',
        description:
          'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.',
        formCompleted: '100',
      },
      {
        id: 23,
        title: 'Данные о поручителях',
        name: 'guarantorsInfo',
        icon: 'uil-user-check',
        iconColor: '#4AB8FF',
        description:
          'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.',
        formCompleted: '100',
      },
    ],
    documentsCards: [
      {
        id: 1,
        title: '3.1.4.19 Документы',
        name: 'documents',
        icon: 'uil-folder-question',
        iconColor: '#677192',
        description:
          'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.',
        formCompleted: '0',
      },
    ],
  };

  cardsList: BehaviorSubject<any> = new BehaviorSubject<any>({});

  documents = [
    {
      docGroupKey: 1,
      docGroupTitle: 'Основные документы',
      docGroupName: 'main-docs',
      docGroupCells: [
        {
          docCellKey: 1,
          docCellTitle: 'Учредительские документы заёмщика',
          docCellName: 'borrower-found-docs',
          docCellFiles: [
            {
              fileId: '',
              fileType: 'pdf',
              fileName: 'Формат документа ПДФ.pdf',
            },
            {
              fileId: '',
              fileType: 'txt',
              fileName: 'Документ МСБ.txt',
            },
            {
              fileId: '',
              fileType: 'xls',
              fileName: 'Отчетная таблица.xls',
            },
            {
              fileId: '',
              fileType: 'doc',
              fileName: 'Документ ворд.docx',
            },
            {
              fileId: '',
              fileType: 'ppt',
              fileName: 'Презентационный документ.ppt',
            },
          ],
        },
        {
          docCellKey: 2,
          docCellTitle: 'Решение учредителей на получение кредита',
          docCellName: 'founders-decision-credit-docs',
          docCellFiles: [
            {
              fileId: '',
              fileType: 'pdf',
              fileName: 'Формат документа ПДФ.pdf',
            },
            {
              fileId: '',
              fileType: 'doc',
              fileName: 'Документ ворд.docx',
            },
            {
              fileId: '',
              fileType: 'ppt',
              fileName: 'Презентационный документ.ppt',
            },
          ],
        },
        {
          docCellKey: 3,
          docCellTitle: 'Договор купли-продажи.',
          docCellName: 'agreement-docs',
          docCellFiles: [
            {
              fileId: '',
              fileType: 'doc',
              fileName: 'Документ ворд.docx',
            },
          ],
        },
      ],
    },
    {
      docGroupKey: 2,
      docGroupTitle: 'Документы о залоге',
      docGroupName: 'pledge-docs',
      docGroupCells: [
        {
          docCellKey: 1,
          docCellTitle: 'Оценка независимого оценщика',
          docCellName: 'estimation-docs',
          docCellFiles: [
            {
              fileId: '',
              fileType: 'txt',
              fileName: 'Документ МСБ.txt',
            },
            {
              fileId: '',
              fileType: 'xls',
              fileName: 'Отчетная таблица.xls',
            },
            {
              fileId: '',
              fileType: 'ppt',
              fileName: 'Презентационный документ.ppt',
            },
          ],
        },
        {
          docCellKey: 2,
          docCellTitle:
            'Решение учредителей залогодателя о предоставлении имущества в залог',
          docCellName: 'founders-decision-provision-docs',
          docCellFiles: [
            {
              fileId: '',
              fileType: 'doc',
              fileName: 'Документ ворд.docx',
            },
            {
              fileId: '',
              fileType: 'ppt',
              fileName: 'Презентационный документ.ppt',
            },
          ],
        },
        {
          docCellKey: 3,
          docCellTitle:
            'Учредительные документы залогодателя (если Залогодатель - юр. лицо)',
          docCellName: 'pledgor-docs',
          docCellFiles: [
            {
              fileId: '',
              fileType: 'doc',
              fileName: 'Документ ворд.docx',
            },
          ],
        },
        {
          docCellKey: 4,
          docCellTitle:
            'Кадастровые документы, тех паспорта автотранспортных средств, ГТД и так далее',
          docCellName: 'pledged-property-docs',
          docCellFiles: [
            {
              fileId: '',
              fileType: 'ppt',
              fileName: 'Презентационный документ.ppt',
            },
          ],
        },
        {
          docCellKey: 5,
          docCellTitle:
            'Копии паспортов руководителя и бухгалтера залогодателя (если Залогодатель - юр. лицо)',
          docCellName: 'passport-copy-docs',
          docCellFiles: [
            {
              fileId: '',
              fileType: 'txt',
              fileName: 'Документ МСБ.txt',
            },
            {
              fileId: '',
              fileType: 'xls',
              fileName: 'Отчетная таблица.xls',
            },
          ],
        },
      ],
    },
    {
      docGroupKey: 3,
      docGroupTitle: 'Документы поручителя',
      docGroupName: 'guarantor-docs',
      docGroupCells: [
        {
          docCellKey: 1,
          docCellTitle:
            'Решение учредителей поручителя о предоставлении поручительства',
          docCellName: 'guarantor-decision-docs',
          docCellFiles: [
            {
              fileId: '',
              fileType: 'txt',
              fileName: 'Документ МСБ.txt',
            },
            {
              fileId: '',
              fileType: 'xls',
              fileName: 'Отчетная таблица.xls',
            },
            {
              fileId: '',
              fileType: 'ppt',
              fileName: 'Презентационный документ.ppt',
            },
          ],
        },
        {
          docCellKey: 2,
          docCellTitle: 'Учредительные документы поручителя',
          docCellName: 'guarantor-constituent-docs',
          docCellFiles: [
            {
              fileId: '',
              fileType: 'doc',
              fileName: 'Документ ворд.docx',
            },
            {
              fileId: '',
              fileType: 'ppt',
              fileName: 'Презентационный документ.ppt',
            },
          ],
        },
        {
          docCellKey: 3,
          docCellTitle: 'Копии паспортов руководителя и бухгалтера поручителя',
          docCellName: 'guarantor-passport-docs',
          docCellFiles: [
            {
              fileId: '',
              fileType: 'doc',
              fileName: 'Документ ворд.docx',
            },
          ],
        },
        {
          docCellKey: 4,
          docCellTitle: 'Справка об оборотах поручителя в других банках',
          docCellName: 'guarantor-turnover-docs',
          docCellFiles: [
            {
              fileId: '',
              fileType: 'ppt',
              fileName: 'Презентационный документ.ppt',
            },
          ],
        },
        {
          docCellKey: 5,
          docCellTitle: 'Копия паспорта (если Поручитель – физ. Лицо)',
          docCellName: 'guarantor-passport-copy-docs',
          docCellFiles: [
            {
              fileId: '',
              fileType: 'txt',
              fileName: 'Документ МСБ.txt',
            },
            {
              fileId: '',
              fileType: 'xls',
              fileName: 'Отчетная таблица.xls',
            },
          ],
        },
      ],
    },
    {
      docGroupKey: 4,
      docGroupTitle: 'Прочие документы',
      docGroupName: 'other-docs',
      docGroupCells: [
        {
          docCellKey: 1,
          docCellTitle:
            'Кадастровые документы по месту осуществления деятельности или договор аренды',
          docCellName: 'other-cadastral-docs',
          docCellFiles: [
            {
              fileId: '',
              fileType: 'pdf',
              fileName: 'Формат документа ПДФ.pdf',
            },
            {
              fileId: '',
              fileType: 'txt',
              fileName: 'Документ МСБ.txt',
            },
            {
              fileId: '',
              fileType: 'xls',
              fileName: 'Отчетная таблица.xls',
            },
            {
              fileId: '',
              fileType: 'doc',
              fileName: 'Документ ворд.docx',
            },
            {
              fileId: '',
              fileType: 'ppt',
              fileName: 'Презентационный документ.ppt',
            },
          ],
        },
        {
          docCellKey: 2,
          docCellTitle:
            'Сметная документация и экспертиза (если кредит запрашивается на приобретение строительных материалов для строительства)',
          docCellName: 'estimated-expertise-docs',
          docCellFiles: [
            {
              fileId: '',
              fileType: 'pdf',
              fileName: 'Формат документа ПДФ.pdf',
            },
            {
              fileId: '',
              fileType: 'doc',
              fileName: 'Документ ворд.docx',
            },
            {
              fileId: '',
              fileType: 'ppt',
              fileName: 'Презентационный документ.ppt',
            },
          ],
        },
        {
          docCellKey: 3,
          docCellTitle:
            'Справка о выполненных работах на объекте строительства (счет-фактура)',
          docCellName: 'invoice-docs',
          docCellFiles: [
            {
              fileId: '',
              fileType: 'doc',
              fileName: 'Документ ворд.docx',
            },
          ],
        },
      ],
    },
  ];

  constructor() {}

  getCards(): Promise<any> {
    return new Promise((resolve: any, reject: any) => {
      try {
        this.cardsList.next(this.cards);
        resolve(true);
      } catch (error) {
        resolve(false);
      }
    });
  }

  updateFormControlState(
    listName: any,
    cardId: any,
    controlName: any,
    controlState: boolean
  ): void {
    this.cards[listName].forEach((card: any) => {
      if (card.id === cardId) {
        card.form?.forEach((control: any) => {
          if (control.controlName === controlName) {
            control.isCompleted = controlState;
          }
        });

        const formLength = card.form?.length;
        const formCompleteLength = card.form?.filter(
          (el: any) => el.isCompleted
        ).length;
        card.formCompleted = parseFloat(
          String((100 * formCompleteLength) / formLength)
        );
      }
    });
  }
}
