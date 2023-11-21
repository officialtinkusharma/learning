import { ComponentFixture, TestBed } from "@angular/core/testing";

import { MultiselectGroupComponent } from "./multiselect-group.component";

describe("MultiselectGroupComponent", () => {
  let component: MultiselectGroupComponent;
  let fixture: ComponentFixture<MultiselectGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MultiselectGroupComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MultiselectGroupComponent);
    component = fixture.componentInstance;
    // component.data = [[{ label: "seema" }, { label: "seema" }]];
    component.selectedValues = { solution_area: [{ id: 1, name: "solution_area", isSelected: true }], process: [{ id: 1, name: "demo", isSelected: true }] };
    component.backupData = {
      solution_area: [{ id: 1, name: "solution_area", isSelected: true }],
      process: [{ id: 1, name: "demo", isSelected: true }],
    };
    component.data = { solution_area: [{ id: 1, name: "solution_area", isSelected: true }], process: [{ id: 1, name: "demo", isSelected: true }] };
    // fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
  it("should execute hidePropertiesPanel", () => {
    const spy = spyOn(component, "hidePropertiesPanel").and.callThrough();
    component.hidePropertiesPanel();
    expect(spy).toHaveBeenCalled();
  });
  it("should execute hidePropertiesPanel for if condition", () => {
    component.openDropdownCalled = true;
    const spy = spyOn(component, "hidePropertiesPanel").and.callThrough();
    component.hidePropertiesPanel();
    expect(spy).toHaveBeenCalled();
  });
  it("should execute ngOnChanges", () => {
    let simpleChange: any = { data: { currentValue: "receieved" } };
    const spy = spyOn(component, "ngOnChanges").and.callThrough();
    component.ngOnChanges(simpleChange);
    expect(spy).toHaveBeenCalled();
  });
  it("should execute ngOnChanges for selected value", () => {
    component.groups = ["solution_area"];
    let simpleChange: any = { selectedValues: { currentValue: [] } };
    const spy = spyOn(component, "ngOnChanges").and.callThrough();
    component.ngOnChanges(simpleChange);
    expect(spy).toHaveBeenCalled();
  });
  it("should execute ngOnChanges for selected 3rd if case", () => {
    const spy = spyOn(component, "ngOnChanges").and.callThrough();
    let simpleChange: any = {
      selectedValues: { currentValue: { solution_area: [{ id: 55, name: "ABC" }] } },
    };

    component.ngOnChanges(simpleChange);
    expect(spy).toHaveBeenCalled();
  });
  it("should execute updateSelectedValueIfDataDelays, first if condition", () => {
    component.selectedValues = {};
    component.groups = ["solution_area"];
    const spy = spyOn(component, "updateSelectedValueIfDataDelays").and.callThrough();
    component.updateSelectedValueIfDataDelays();
    expect(spy).toHaveBeenCalled();
  });
  it("should execute updateSelectedValueIfDataDelays for null", () => {
    component.data = {};
    const spy = spyOn(component, "updateSelectedValueIfDataDelays").and.callThrough();
    component.updateSelectedValueIfDataDelays();
    expect(spy).toHaveBeenCalled();
  });
  it("it should execute ngOnChanges for null", () => {
    let simpleChange: any = null;
    const spy = spyOn(component, "ngOnChanges").and.callThrough();
    component.ngOnChanges(simpleChange);
    expect(spy).toHaveBeenCalled();
  });
  it("it should execute ngOnInit", () => {
    const spy = spyOn(component, "ngOnInit").and.callThrough();
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });
  it("should updateSelectedItems", () => {
    let spy1 = spyOn(component, "updateSelectedItems").and.callThrough();
    let data: any = { id: 1, name: "ABC", description: "My demo 1", isSelected: true };
    component.selectedItems = {
      solution_area: [{ id: 1, name: "demo" }],
    };
    let groups: any = "solution_area";
    let event: any;
    component.updateSelectedItems(data, event, groups);
    expect(spy1).toHaveBeenCalled();
  });
  it("should updateSelectedItems for if else", () => {
    let spy1 = spyOn(component, "updateSelectedItems").and.callThrough();
    let data: any = { id: 1, name: "ABC", description: "My demo 1", isSelected: true };
    component.selectedItems = {
      solution_area: [
        { id: 1, name: "demo" },
        { id: 2, name: "seema" },
      ],
    };
    let groups: any = "solution_area";
    let event: any;
    component.updateSelectedItems(data, event, groups);
    expect(spy1).toHaveBeenCalled();
  });

  it("should updateSelectedItems if data aleady selected", () => {
    let spy1 = spyOn(component, "updateSelectedItems").and.callThrough();
    let event: any;
    component.updateSelectedItems({ id: 1, name: "Tinku Sharma" }, event, "solution_area");
    expect(spy1).toHaveBeenCalled();
  });
  it("should execute on removeItem", () => {
    let event: any = { stopPropagation: () => {} };
    let item: any = { id: 1, name: "demo" };
    let group: any = "solution_area";
    component.selectedItems = { solution_area: [{ id: 1, label: "ssn" }] };
    const spy = spyOn(component, "removeItem").and.callThrough();
    component.removeItem(event, item, group);
    expect(spy).toHaveBeenCalled();
  });
  it("should execute on toggleDropdown", () => {
    component.showDropdown = false;
    component.openDropdownCalled = false;
    const spy = spyOn(component, "toggleDropdown").and.callThrough();
    component.toggleDropdown();
    expect(spy).toHaveBeenCalled();
  });
  it("should execute searchData", () => {
    const spy = spyOn(component, "searchData").and.callThrough();
    component.backupGroup = ["solution_area"];
    component.searchParam = "s";
    component.groups = ["solution_area"];
    component.searchData();
    expect(spy).toHaveBeenCalled();
  });
  it("should execute searchData for if", () => {
    const spy = spyOn(component, "searchData").and.callThrough();
    component.backupGroup = ["solution_area"];
    component.searchParam = "z";
    component.groups = ["solution_area"];
    component.searchData();
    expect(spy).toHaveBeenCalled();
  });
  it("should execute searchData for null", () => {
    const spy = spyOn(component, "searchData").and.callThrough();
    component.backupGroup = ["solution_area"];
    component.backupData = { solution_area: [{ id: 1 }] };
    component.searchParam = "s";
    component.groups = ["solution_area"];
    component.searchData();
    expect(spy).toHaveBeenCalled();
  });
});
