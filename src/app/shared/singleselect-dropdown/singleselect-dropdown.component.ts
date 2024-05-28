import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  OnChanges,
  SimpleChanges,
  TemplateRef,
  forwardRef,
  ViewChild,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

@Component({
  selector: 'app-singleselect-dropdown',
  templateUrl: './singleselect-dropdown.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SingleSelectDropdownComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => SingleSelectDropdownComponent),
      multi: true,
    },
  ],
  styleUrls: ['./singleselect-dropdown.component.scss'],
})
export class SingleSelectDropdownComponent
  implements OnInit, OnChanges, ControlValueAccessor
{
  defaultSetting: any = {
    idField: 'id',
    textField: 'name',
    heightPx: 24,
    placeholderName: 'Select',
    searchEnable: true,
    selectType: 'object',
    noDataAvailableText: 'No Data To Select',
    requiredMessage: 'This field is required',
  };
  @Input() optionsList: any = [];
  @Input() disabledField = false;
  @Input() requiredField = false;
  @Input()
  public set singleSelectSettings(value: any) {
    if (value) {
      this.selectSettings = { ...this.defaultSetting, ...value };
    } else {
      this.selectSettings = { ...this.defaultSetting };
    }
  }

  @Output() selectItem = new EventEmitter();
  @Input()
  optionTemplate!: TemplateRef<any>;

  @ViewChild('optionTemplateRef') optionTemplateRef!: TemplateRef<any>;
  showdropdown: boolean = false;
  openDropdownCalled: boolean = false;
  showselectedItem: any = {};
  dropdownValues: any = [];

  selectSettings: any;

  constructor() {}
  /**
   * @author Tinku Sharma
   * @description ngOnchnage() method use show preselect data
   * @param {changes} SimpleChanges type
   * @returns {void}
   */
  ngOnChanges(_changes: SimpleChanges): void {
    if (this.optionsList) {
      this.dropdownValues = JSON.parse(JSON.stringify(this.optionsList));
    }
    if (_changes?.['optionsList']?.currentValue) {
      this.showSingle = this.optionsList.every(
        (item: any) =>
          typeof item == 'number' ||
          typeof item == 'string' ||
          typeof item == 'boolean'
      );
    }
    if (_changes?.['selectSettings']?.currentValue) {
      this.selectSettings = { ...this.defaultSetting, ...this.selectSettings };
    }
  }
  showSingle: boolean = false;
  blurSelect = false;
  control: any;
  ngOnInit(): void {}
  public onOutsideClick(_event: any): void {
    this.showdropdown = false;
  }
  /**
   * @author Tinku Sharma
   * @description opendropdonw() method use for dropdown list
   * @param {none}
   * @returns {void}
   */
  opendropdown() {
    this.showdropdown = !this.showdropdown;
    if (this.blurSelect) this.onTouchedCallback();
    this.blurSelect = !this.blurSelect;

    if (this.optionsList) {
      this.dropdownValues = JSON.parse(JSON.stringify(this.optionsList));
    }
  }
  /**
   * @author Tinku Sharma
   * @description searchData() method use for search name from list
   * @param {event} event type
   * @returns {void}
   */
  searchdata(event: any) {
    const searchValue = event.target.value;
    this.dropdownValues = this.optionsList.filter((item: any) =>
      this.showSingle
        ? item.toString().toLowerCase().includes(searchValue.toLowerCase())
        : item.name.toString().toLowerCase().includes(searchValue.toLowerCase())
    );
    event.stopPropagation();
  }
  /**
   * @author Tinku Sharma
   * @description selectData() method use for select data and emit fire select data
   * @param {data} selected data
   * @returns {void}
   */
  selectData(data: any) {
    if (this.blurSelect) this.onTouchedCallback();
    this.showdropdown = false;
    this.blurSelect = false;
    if (JSON.stringify(this.showselectedItem) != JSON.stringify(data)) {
      this.showselectedItem = data;

      if (this.selectSettings.selectType == 'object' || this.showSingle) {
        this.onChangeCallback(this.showselectedItem);
      } else {
        this.onChangeCallback(
          this.showselectedItem[this.selectSettings.idField]
        );
      }
      this.selectItem.emit(data);
    }
  }

  closeDropdown(_event: any) {
    this.showdropdown = false;
    if (this.blurSelect) this.onTouchedCallback();
    this.blurSelect = false;
  }
  writeValue(value: any): void {
    if (this.showSingle) {
      this.showselectedItem = '';
    } else {
      this.showselectedItem = {
        [this.selectSettings.idField]: '',
        [this.selectSettings.textField]: '',
      };
    }
    if (this.optionsList.length && value) {
      if (this.showSingle) {
        let getItem = this.optionsList.find((item: any) => item == value);
        if (!getItem) {
          this.showselectedItem = '';
        } else {
          this.showselectedItem = getItem;
        }
        this.onChangeCallback(this.showselectedItem);
      } else {
        if (typeof value === 'object' && Object.keys(value).length) {
          this.showselectedItem = this.optionsList.find(
            (item: any) =>
              item[this.selectSettings.idField] ==
              value[this.selectSettings.idField]
          );
        } else {
          this.showselectedItem = this.optionsList.find(
            (item: any) => item[this.selectSettings.idField] == value
          );
        }

        if (this.selectSettings.selectType == 'object') {
          this.onChangeCallback(this.showselectedItem);
        } else {
          this.onChangeCallback(
            this.showselectedItem[this.selectSettings.idField]
          );
        }
      }
      this.selectItem.emit(this.showselectedItem);
    }
  }
  private onTouchedCallback: () => void = () => {};
  private onChangeCallback: (_: any) => void = () => {};
  // private onValidatorChange: () => void = () => {};
  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }
  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }
  // registerOnValidatorChange(fn: () => void): void {
  //   this.onValidatorChange = fn;
  // }
  // Validator Interface
  public validate(c: FormControl) {
    this.control = c;
  }
}
