package com.usersmanager.usersapp.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;
import java.util.List;

//User Entity
@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Auto-increments primary key
    private Long id;

    @NotBlank(message = "First Name is required")
    @Column(nullable = false)
    private String firstName;

    @NotBlank(message = "Last Name is required")
    @Column(nullable = false)
    private String lastName;

    @NotNull(message = "Gender is required")
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Gender gender;

    @NotNull(message = "Birthdate is required")
    @Column(nullable = false)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy")
    private LocalDate birthdate;

    @Column
    @Pattern(regexp = "\\d{10}", message = "Phone number must be 10 digits")
    private String phone;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference    //JSON Serialization to avoid circular references (stack overflow)
    private List<Address> addresses;

    //Constructors, Getters and Setters
    public User(){
    }

    public User(String firstName, String lastName, Gender gender, LocalDate birthdate, String phone, List<Address> addresses){
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.birthdate = birthdate;
        this.phone = phone;
        this.addresses = addresses;
    }

    public Long getId(){
        return id;
    }

    public void setId(Long id){
        this.id = id;
    }

    public String getFirstName(){
        return firstName;
    }

    public void setFirstName(String firstName){
        this.firstName = firstName;
    }

    public String getLastName(){
        return lastName;
    }

    public void setLastName(String lastName){
        this.lastName = lastName;
    }

    public Gender getGender(){
        return gender;
    }

    public void setGender(Gender gender){
        this.gender = gender;
    }

    public LocalDate getBirthdate(){
        return birthdate;
    }

    public void setBirthdate(LocalDate birthdate){
        this.birthdate = birthdate;
    }

    public String getPhone(){
        return phone;
    }

    public void setPhone(String phone){
        this.phone = phone;
    }

    public List<Address> getAddresses(){
        return addresses;
    }

    public void setAddresses(List<Address> addresses){
        this.addresses = addresses;
    }
}
