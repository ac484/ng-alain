# Implementation Plan



- [ ] 4.3 Migrate and preserve all contract services and models with complete functionality
  - Move contract.service.ts to features/contracts/services while preserving all methods
  - Preserve getNextContractSerial() method with transaction-based serial number generation
  - Preserve recycleContractSerial() method for serial number recycling
  - Preserve getClientsSettings() and setClientsSettings() methods for dynamic client management
  - Preserve getDefaultClient() method for default client functionality
  - Move contract.model.ts, contract-payment.model.ts, contract-workflow.model.ts to features/contracts/models
  - Preserve ContractPaymentService with all payment CRUD operations and workflow integration
  - Preserve ContractWorkflowService with template management and workflow processing
  - Preserve ContractAttachmentService for file upload functionality
  - Update services to use repository pattern while maintaining all existing functionality
  - Add comprehensive unit tests for all migrated services
  - _Requirements: 6.1, 6.2, 6.3, 9.1, 9.2, 9.3, 9.4, 10.1, 10.2, 10.3, 10.4_

- [ ] 5. Complete missing directory structure according to plan
  - Create missing subdirectories and organize components properly
  - Ensure all features follow the planned structure consistently
  - Add missing index.ts barrel export files
  - _Requirements: 1.1, 1.2, 5.1, 5.2, 5.3_

- [ ] 5.1 Complete contract feature structure organization
  - Create contract-payments subdirectory under features/contracts/components
  - Create contract-workflow subdirectory under features/contracts/components
  - Move payment-form and payment-list components to contract-payments subdirectory
  - Move workflow-steps component to contract-workflow subdirectory
  - Add proper index.ts files for each subdirectory
  - _Requirements: 1.1, 1.2, 5.3_

- [ ] 5.2 Complete settings feature structure organization
  - Create settings-list subdirectory under features/settings/components
  - Create workflow-templates subdirectory under features/settings/components
  - Organize settings components according to the directory plan
  - Add proper index.ts files for each subdirectory
  - _Requirements: 1.1, 1.2, 5.3_

- [ ] 5.3 Add missing core infrastructure components
  - Create auditable.model.ts in core/models extending BaseModel
  - Add validation.utils.ts and date.utils.ts to shared/utils if missing
  - Ensure all shared components have proper HTML and CSS files
  - Add missing index.ts barrel exports throughout the structure
  - _Requirements: 1.3, 2.1, 5.3_

- [x] 5.4 Restore and enhance FAB component functionality










  - Restore full FAB functionality that was lost during migration
  - Implement configurable action buttons with dynamic icons and labels
  - Add proper TypeScript interfaces for FAB configuration (FabAction, FabConfig)
  - Preserve all original features: drag-and-drop, smart placement, dynamic icons
  - Add support for multiple action buttons with different types (add, edit, delete, etc.)
  - Implement proper event handling with action type and payload
  - Add position persistence using localStorage or service
  - Create comprehensive component documentation and usage examples
  - Write unit tests for all FAB functionality including drag behavior and smart placement
  - _Requirements: 2.1, 2.2, 2.4, 3.1_

- [ ] 6. Clean up legacy directories and files
  - Remove old contract/ directory after migration is complete
  - Remove old settings/ directory after migration is complete  
  - Remove old workspace/ directory after migration is complete
  - Remove basic/widget/ directory after FAB migration
  - Remove fire-crud/ directory after service migration
  - Clean up tree/ directory if no longer needed
  - _Requirements: 5.4_

- [ ] 7. Verify and fix import statements throughout application
  - Update all import statements to use new barrel export paths
  - Ensure no broken imports remain after directory restructuring
  - Test that all components can resolve their dependencies
  - Update any external references to moved components
  - _Requirements: 1.3, 4.2, 5.4_



- [ ] 8. Test routing and lazy loading functionality
  - Verify that each feature loads independently
  - Test route navigation and component rendering
  - Validate bundle splitting and performance improvements
  - Check browser developer tools for proper chunk loading
  - _Requirements: 4.1, 4.3_

- [ ] 9. Implement comprehensive testing
  - Write unit tests for all migrated components and services
  - Create integration tests for feature modules
  - Add performance tests for lazy loading
  - _Requirements: 6.3_

- [ ] 9.1 Write unit tests for core services
  - Test enhanced HubCrudService with various data types
  - Test repository pattern implementations
  - Test error handling service functionality
  - Achieve minimum 80% code coverage for core services
  - _Requirements: 6.3_

- [ ] 9.2 Write unit tests for feature components
  - Test all contract feature components (list, form, payments)
  - Test settings and workspace components
  - Test shared components (FAB, error boundary)



  - Mock dependencies properly and test component behavior
  - _Requirements: 6.3_

- [ ] 9.3 Create integration tests for features
  - Test complete user workflows for contract management
  - Test feature routing and lazy loading integration
  - Test cross-feature communication and shared services
  - Validate error handling across feature boundaries
  - _Requirements: 6.3_

- [ ] 10. Performance optimization and validation
  - Validate bundle size improvements from lazy loading
  - Test application performance with new architecture
  - Optimize change detection and memory usage
  - _Requirements: 4.1, 4.3_

- [ ] 10.1 Validate lazy loading performance
  - Measure initial bundle size reduction
  - Test feature loading times and user experience
  - Validate proper tree-shaking with new structure
  - Document performance improvements achieved
  - _Requirements: 4.1, 4.3_

- [ ] 10.2 Optimize change detection strategy
  - Ensure all components use OnPush where appropriate
  - Implement Angular v20 signals for reactive state management
  - Optimize subscription management and memory usage
  - Test application responsiveness under load
  - _Requirements: 3.2, 3.3_

- [ ] 11. Documentation and cleanup
  - Update project documentation to reflect new structure
  - Create developer guide for new architecture patterns
  - Clean up old files and update import statements
  - _Requirements: 5.4_

- [ ] 11.1 Update project documentation
  - Document new directory structure and organization principles
  - Create developer guide for adding new features
  - Update README with new architecture information
  - Document migration process for future reference
  - _Requirements: 5.4_

- [ ] 11.2 Clean up legacy code and files
  - Remove old directory structure and unused files
  - Update all import statements throughout the application
  - Verify no broken imports or missing dependencies
  - Run full application test suite to ensure stability
  - _Requirements: 5.4_