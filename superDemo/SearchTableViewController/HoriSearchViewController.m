//
//  HoriSearchViewController.m
//  SuperDemo
//
//  Created by Rany on 2017/8/13.
//  Copyright © 2017年 Rany. All rights reserved.
//

#import "HoriSearchViewController.h"

@interface HoriSearchViewController ()<UISearchResultsUpdating>

@end

@implementation HoriSearchViewController

- (void)viewDidLoad {
    [super viewDidLoad];

    self.searchResultsUpdater = self;

}

-(void)updateSearchResultsForSearchController:(UISearchController *)searchController
{
    if ([searchController.searchBar.text isEqualToString:@""]) {
        
        //add launchView
        
        //launchView
        
        UIView *superviewOfDimmingView = self.searchResultsController.view.superview;
        
        [superviewOfDimmingView insertSubview:self.launchView atIndex:0];

        UIView *searchBarContainerView = nil;
        for (UIView *subview in self.view.subviews) {
            if ([NSStringFromClass(subview.class) isEqualToString:@"_UISearchBarContainerView"]) {
                searchBarContainerView = subview;
                break;
            }
        }
        
        self.launchView.frame = CGRectInsetEdges(self.launchView.superview.bounds, UIEdgeInsetsMake(searchBarContainerView ? CGRectGetMaxY(searchBarContainerView.frame) : 0, 0, 0, 0));
        
        [self.launchView layoutSubviews];
        
    }else{
    
        if (self.aDelegate) {
            [self.aDelegate updateSearchResultsForSearchController:self SearchText:searchController.searchBar.text];
        }
        
    }
}




@end
