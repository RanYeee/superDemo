//
//  RNSlideViewController.m
//  SuperDemo
//
//  Created by Rany on 16/8/6.
//  Copyright © 2016年 Rany. All rights reserved.
//
#define kNavigationBarHeight 64
#define kTopVieHeight 250
#import "RNSlideViewController.h"
#import "SVPullToRefresh.h"
#import "RNTopView.h"


@interface RNSlideViewController ()<UITableViewDelegate,UITableViewDataSource,UIScrollViewDelegate>

{
    
    CGFloat _oldOffset;
    

}

@property (nonatomic,strong) UITableView *tableView;

@property (nonatomic,strong) RNTopView *topView;

@end

@implementation RNSlideViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    
    self.view.backgroundColor = [UIColor whiteColor];

    [self.view addSubview:self.topView];

    self.tableView = [[UITableView alloc]initWithFrame:CGRectMake(0, kNavigationBarHeight, SCREEN_WIDTH, SCREEN_HEIGHT-kNavigationBarHeight) style:UITableViewStylePlain];
    
    self.tableView.contentInset = UIEdgeInsetsMake(kTopVieHeight - kNavigationBarHeight, 0, 0, 0);
    
    self.tableView.delegate = self;
    
    self.tableView.dataSource = self;
    
    self.tableView.separatorStyle = UITableViewCellSeparatorStyleNone;
    
    [self.view insertSubview:self.tableView belowSubview:self.topView];

}

- (RNTopView *)topView
{
    if (!_topView) {
        
        _topView = [[RNTopView alloc]initWithFrame:CGRectMake(0, 0, SCREEN_WIDTH, kTopVieHeight)];
        
        [_topView setItems:@[@"ONE",@"TOW",@"THREE",@"FOUR",@"FIVE",@"SIX",@"Seven",@"eight",@"nine"]];
        
        [_topView setIconImage:[UIImage imageNamed:@"AppIcon60x60"]];
        

    }
    
    return _topView;
}

-(void)viewWillAppear:(BOOL)animated
{
    [super viewWillAppear:animated];
    
    self.navigationController.navigationBar.hidden = YES;
    
    [self.topView reloadWithScrollView:self.tableView];

}

#pragma mark - tabelView delegate & dataSource

-(NSInteger)numberOfSectionsInTableView:(UITableView *)tableView{
    
    return 1;
}

-(NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section{
    
    return 20;
}

-(UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath{
    
    static NSString *cellID = @"cellId";
    
    UITableViewCell *cell = [tableView dequeueReusableCellWithIdentifier:cellID];
    
    if (!cell) {
        
        cell = [[UITableViewCell alloc]initWithStyle:UITableViewCellStyleValue1 reuseIdentifier:cellID];

       
    }
    
    
    //奇偶数行cell颜色显示不同
    if (indexPath.row %2 ==0) {
        
        cell.backgroundColor = [UIColor colorWithHexString:@"f7fafb"];
    }
    else{
        
        cell.backgroundColor = [UIColor whiteColor];
    }

    
    return cell;
}



-(CGFloat)tableView:(UITableView *)tableView heightForRowAtIndexPath:(NSIndexPath *)indexPath
{
    
    return 80;
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
    [self.topView reloadWithScrollView:scrollView];
}





@end
