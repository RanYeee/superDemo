//
//  SearchTableViewController.m
//  SuperDemo
//
//  Created by Rany on 2017/8/13.
//  Copyright © 2017年 Rany. All rights reserved.
//

#import "SearchTableViewController.h"
#import "SearchResultTableViewController.h"
#import "HoriSearchViewController.h"
#import "SearchLaunchView.h"

@interface SearchTableViewController ()<UITableViewDelegate,UITableViewDataSource,HoriSearchViewControllerDelegate>

@property(nonatomic, strong) HoriSearchViewController *horiSearchController;

@property(nonatomic, strong) UITableView *tableView;

@property(nonatomic, strong) SearchResultTableViewController *searchReaultVC;

@end

@implementation SearchTableViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    self.view.backgroundColor = [UIColor whiteColor];
    
    self.tableView = [[UITableView alloc]initWithFrame:self.view.bounds style:UITableViewStylePlain];
    self.tableView.delegate = self;
    self.tableView.dataSource = self;
    [self.view addSubview:self.tableView];
    self.tableView.tableHeaderView = self.horiSearchController.searchBar;
    self.tableView.tableHeaderView.backgroundColor = [UIColor lightGrayColor];
    
    
}
- (void)viewWillDisappear:(BOOL)animated {
    [super viewWillDisappear:animated];
    if (self.horiSearchController.active) {
        self.horiSearchController.active = NO;
        [self.horiSearchController.searchBar removeFromSuperview];
    }
}

-(HoriSearchViewController *)horiSearchController
{
    if (!_horiSearchController) {
        
        _horiSearchController = [[HoriSearchViewController alloc] initWithSearchResultsController:self.searchReaultVC];
        _horiSearchController.aDelegate = self;
        _horiSearchController.searchBar.frame = CGRectMake(0, 0, SCREEN_WIDTH, 40);
        _horiSearchController.searchBar.placeholder = @"搜索";
        SearchLaunchView *launchView = [[SearchLaunchView alloc]initWithFrame:CGRectMake(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT)];
        _horiSearchController.launchView = launchView;
        _horiSearchController.searchBar.searchBarStyle = UISearchBarStyleProminent;
        return _horiSearchController;
    }
    return _horiSearchController;

}

-(SearchResultTableViewController *)searchReaultVC
{
    if (!_searchReaultVC) {
        _searchReaultVC = [[SearchResultTableViewController alloc]init];
    }
    
    return _searchReaultVC;
}
#pragma mark UITableViewDataSource、delegate
- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section {
    return 10;
}


- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath {
    UITableViewCell *cell = [tableView dequeueReusableCellWithIdentifier:@"ApplicationTableViewCell"];
    if (!cell) {
        cell = [[UITableViewCell alloc]initWithStyle:UITableViewCellStyleValue2 reuseIdentifier:@"ApplicationTableViewCell"];
    }
    
    cell.textLabel.text = @"h";
    cell.selectionStyle = NO;
    return cell;
}

#pragma mark horiSearchViewControllerDelegate

- (void)updateSearchResultsForSearchController:(HoriSearchViewController *)searchController SearchText:(NSString *)searchText
{
    [self.searchReaultVC updateData];

    NSLog(@"searchText = %@",searchText);
}


@end
