# Implementation Plan

- [x] 1. Create minimal core data models





  - Define essential TypeScript interfaces: ContractPayment, ContractPaymentStep, WorkflowDefinition
  - Create minimal PaymentStatus and StepStatus type unions
  - Keep interfaces lean with only required fields
  - _Requirements: 1.3, 2.2, 3.2, 4.1_

- [x] 2. Implement minimal ContractWorkflowService




  - Create service extending existing HubCrudService pattern
  - Use @angular/fire for all Firestore operations (collection, doc, addDoc, updateDoc, deleteDoc)
  - Implement essential methods: listTemplates(), getTemplateForClient(), createTemplate()
  - Keep workflow logic minimal and focused
  - _Requirements: 3.1, 3.2, 4.2, 5.1, 5.2, 5.3, 5.5_



- [x] 3. Implement minimal ContractPaymentService



  - Create service following existing ContractService pattern
  - Use @angular/fire consistently for all database operations
  - Implement core CRUD: list(), add(), update(), delete()
  - Add minimal workflow integration: initializeWorkflow(), advanceWorkflow()
  - Keep business logic simple and focused
  - _Requirements: 1.1, 1.2, 2.1, 2.3, 2.4, 3.3, 4.1, 4.2, 4.3, 4.4, 4.5_

- [ ] 4. Create minimal ContractPaymentFormComponent with OnPush
  - Build standalone component with ChangeDetectionStrategy.OnPush
  - Use signals for reactive state management
  - Implement minimal reactive form with essential validation
  - Keep template and logic minimal, following existing form patterns
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 6.1, 6.2, 6.3_

- [ ] 5. Build minimal ContractPaymentListComponent with OnPush
  - Create standalone component with ChangeDetectionStrategy.OnPush
  - Use signals for all reactive state (payments, loading, editingId)
  - Follow existing contract-list inline editing pattern
  - Keep template minimal with essential functionality only
  - Implement efficient OnPush-compatible change detection
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 2.1, 2.2, 2.3, 2.4, 2.5, 4.1_

- [ ] 6. Integrate payment sub-table with minimal changes to ContractListComponent
  - Add minimal expandable row functionality to existing template
  - Use OnPush strategy for optimal performance
  - Keep integration lightweight and non-intrusive
  - Maintain existing contract functionality unchanged
  - _Requirements: 1.1, 1.2, 7.1, 7.2, 7.3, 7.4, 7.5_

- [ ] 7. Create minimal WorkflowSettingsComponent with OnPush
  - Build standalone component with ChangeDetectionStrategy.OnPush
  - Use signals for reactive state management
  - Implement minimal template CRUD following existing patterns
  - Keep UI simple with essential workflow management only
  - Use @angular/fire consistently for all operations
  - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5_

- [ ] 8. Add minimal file attachment support
  - Implement basic file upload using @angular/fire Storage
  - Add essential file validation (type, size)
  - Create simple attachment display and download
  - Keep file management minimal and focused
  - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5_

- [ ] 9. Implement minimal workflow state transitions
  - Create simple workflow progression logic
  - Use @angular/fire runTransaction for atomic updates
  - Keep state machine logic minimal and essential
  - Focus on core workflow advancement only
  - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5_

- [ ] 10. Add essential error handling
  - Implement basic form validation
  - Add simple error message display
  - Keep error handling minimal but effective
  - Use existing notification patterns
  - _Requirements: 2.5, 7.4_

- [ ] 11. Create focused test coverage
  - Write essential unit tests for services
  - Add basic component tests
  - Keep test suite minimal but comprehensive
  - Focus on critical functionality testing
  - _Requirements: All requirements validation_

- [ ] 12. Final integration and optimization
  - Connect all components with OnPush optimization
  - Ensure consistent @angular/fire usage throughout
  - Apply minimalist principles to final implementation
  - Optimize for performance with signals and OnPush
  - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5_