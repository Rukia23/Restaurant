package com.example.bita.zero.loop.controller;

import java.util.List;
import java.util.Optional;

import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.bita.zero.loop.Repository.OrderRepository;
import com.example.bita.zero.loop.model.Order;

import org.slf4j.Logger;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class OrderController {

    private static final Logger logger = LoggerFactory.getLogger(OrderController.class);

    @Autowired
    private OrderRepository orderRepository;

    /**
     * 
     * @return 
     */
    @GetMapping("/orders")
    public ResponseEntity<List<Order>> getAllOrders() {
        List<Order> orders = orderRepository.findAll();
        return new ResponseEntity<>(orders, HttpStatus.OK);
    }

    /**
     * 
     * @param 
     * @return   
     */
    @PostMapping("/orders")
    public ResponseEntity<String> createOrder(@RequestBody Order order) {
        try {
            Order newOrder = orderRepository.save(order);
            logger.info("Order created: {}", newOrder);
            return new ResponseEntity<>("Order created successfully", HttpStatus.CREATED);
        } catch (Exception e) {
            logger.error("Error creating order", e);
            return new ResponseEntity<>("Error creating order", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * 
     * @param id 
     * @return 
     */
    @GetMapping("/orders/{id}")
    public ResponseEntity<Order> getOrderById(@PathVariable Long id) {
        Optional<Order> order = orderRepository.findById(id);
        if (order.isPresent()) {
            return new ResponseEntity<>(order.get(), HttpStatus.OK);
        } else {
            logger.warn("Order with ID {} not found", id);
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    /**
     * 
     * @param id 
     * @param orderDetails 
     * @return 
     */
    @PutMapping("/orders/{id}")
    public ResponseEntity<Order> updateOrder(@PathVariable Long id, @RequestBody Order orderDetails) {
        Optional<Order> optionalOrder = orderRepository.findById(id);
        if (optionalOrder.isPresent()) {
            Order existingOrder = optionalOrder.get();
            existingOrder.setName(orderDetails.getName());
            existingOrder.setEmail(orderDetails.getEmail());
            existingOrder.setPhoneNumber(orderDetails.getPhoneNumber());
            existingOrder.setAddress(orderDetails.getAddress());
            existingOrder.setOrderDetails(orderDetails.getOrderDetails());
            Order updatedOrder = orderRepository.save(existingOrder);
            logger.info("Order updated: {}", updatedOrder);
            return new ResponseEntity<>(updatedOrder, HttpStatus.OK);
        } else {
            logger.warn("Order with ID {} not found for update", id);
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    /**
     * 
     * @param id 
     * @return 
     */
    @DeleteMapping("/orders/{id}")
    public ResponseEntity<String> deleteOrder(@PathVariable Long id) {
        if (orderRepository.existsById(id)) {
            orderRepository.deleteById(id);
            logger.info("Order with ID {} deleted", id);
            return new ResponseEntity<>("Order deleted successfully", HttpStatus.OK);
        } else {
            logger.warn("Order with ID {} not found for deletion", id);
            return new ResponseEntity<>("Order not found", HttpStatus.NOT_FOUND);
        }
    }
}
