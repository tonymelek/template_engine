// TODO: Write code to define and export the Employee class
class Employee {
    constructor(name = '', id = 0, email = '') {
        this.name = name
        this.id = id
        this.email = email
    }

}
    Employee.prototype.getName = function () {
    return this.name
}
    Employee.prototype.getId = function () {
    return this.id
}
    Employee.prototype.getEmail = function () {
    return this.email
}
    Employee.prototype.getRole = function () {
    return "Employee"
}


module.exports = Employee