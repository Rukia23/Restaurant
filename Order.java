package com.example.bita.zero.loop.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="orders")
public class Order {

   @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false)
  private String name;

  @Column(nullable = false)
  private String email;

  @Column(nullable = false)
  private String phoneNumber;

  @Column(nullable = false)
  private String address;

  @Column(nullable = false)
  private String orderDetails;

  public Order() {
  }

  public Order(Long id, String name, String email, String phoneNumber, String address, String orderDetails) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.address = address;
    this.orderDetails = orderDetails;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public String getPhoneNumber() {
    return phoneNumber;
  }

  public void setPhoneNumber(String phoneNumber) {
    this.phoneNumber = phoneNumber;
  }

  public String getAddress() {
    return address;
  }

  public void setAddress(String address) {
    this.address = address;
  }

  public String getOrderDetails() {
    return orderDetails;
  }

  public void setOrderDetails(String orderDetails) {
    this.orderDetails = orderDetails;
  }

  @Override
  public String toString() {
    return "Order [id=" + id + ", name=" + name + ", email=" + email + ", phoneNumber=" + phoneNumber + ", address="
        + address + ", orderDetails=" + orderDetails + "]";
  }

  
  

}
