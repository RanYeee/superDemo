//
//  RNSlideViewController.m
//  SuperDemo
//
//  Created by Rany on 16/8/6.
//  Copyright © 2016年 Rany. All rights reserved.
//

#import "RNSlideViewController.h"

@interface RNSlideViewController ()<UITableViewDelegate,UITableViewDataSource,UIScrollViewDelegate>

@property (nonatomic,strong) UITableView *tableView;

@end

@implementation RNSlideViewController

- (void)viewDidLoad {
    [super viewDidLoad];

    UIView *topView = [[UIView alloc]initWithFrame:CGRectMake(0, 0, SCREEN_WIDTH, 200)];
    
    topView.backgroundColor = [UIColor colorWithRed:0.3725 green:0.702 blue:0.2039 alpha:1.0];
    
    [self.view addSubview:topView];

    self.tableView = [[UITableView alloc]initWithFrame:CGRectMake(0, 200, SCREEN_WIDTH, SCREEN_HEIGHT-200) style:UITableViewStyleGrouped];
    
    self.tableView.delegate = self;
    
    self.tableView.dataSource = self;
    
    
    
    [self.view addSubview:self.tableView];

}

-(void)viewWillAppear:(BOOL)animated
{
    [super viewWillAppear:animated];
    
    self.navigationController.navigationBar.hidden = YES;
}

-(void)viewWillDisappear:(BOOL)animated
{
    
    self.navigationController.navigationBar.hidden = NO;
}

#pragma mark - tabelView delegate & dataSource

-(NSInteger)numberOfSectionsInTableView:(UITableView *)tableView{
    
    return 1;
}

-(NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section{
    
    return 10;
}

-(UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath{
    
    static NSString *cellID = @"cellId";
    
    UITableViewCell *cell = [tableView dequeueReusableCellWithIdentifier:cellID];
    
    if (!cell) {
        
        cell = [[UITableViewCell alloc]initWithStyle:UITableViewCellStyleValue1 reuseIdentifier:cellID];

    }
    
    return cell;
}

-(CGFloat)tableView:(UITableView *)tableView heightForHeaderInSection:(NSInteger)section
{
    
  
    return 0.01;
}


-(void)tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath{
    
}

-(UIView *)tableView:(UITableView *)tableView viewForHeaderInSection:(NSInteger)section
{
    
    if (section == 0) {
        
        
    }
    
    return nil;
    
}

-(void)scrollViewDidScroll:(UIScrollView *)scrollView
{
    
        NSLog(@"%f",scrollView.contentOffset.y);
    
    if (scrollView.contentOffset.y >=100) {
        
        [self.tableView setContentOffset:CGPointMake(0, 100)];
    }
    
}

@end
